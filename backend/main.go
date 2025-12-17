package main

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"github.com/wimwenigerkind/lf10_weather_dashboard/backend/internal/config"
)

var cfg config.Config
var rdb *redis.Client
var ctx = context.Background()

type UnsplashResponse struct {
	Results []struct {
		URLs struct {
			Raw string `json:"raw"`
		} `json:"urls"`
	} `json:"results"`
}

func main() {
	cfg = *config.LoadConfig()
	rdb = redis.NewClient(&redis.Options{
		Addr:     cfg.RedisConfig.Address,
		Password: cfg.RedisConfig.Password,
		DB:       cfg.RedisConfig.DB,
	})
	defer rdb.Close()

	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		panic("Failed to connect to Redis: " + err.Error())
	}
	println("Successfully connected to Redis:", pong)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:  []string{"https://lf10-weather-dashboard.wimdev.de"},
		AllowMethods:  []string{"GET"},
		AllowHeaders:  []string{"Origin"},
		ExposeHeaders: []string{"Content-Length"},
		MaxAge:        12 * time.Hour,
	}))

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/api/image/search", func(c *gin.Context) {
		query := c.Query("query")
		if query == "" {
			c.JSON(400, gin.H{
				"error": "no search query provided",
			})
			return
		}

		timeoutCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		var imageURL string
		val, err := rdb.Get(timeoutCtx, "unsplash:query:"+query).Result()
		if errors.Is(err, redis.Nil) {
			imageURL = imageSearch(query)
			println("miss")
			if err := rdb.Set(timeoutCtx, "unsplash:query:"+query, imageURL, time.Hour*24).Err(); err != nil {
				println("Failed to cache result:", err.Error())
			}
		} else if err != nil {
			println("Redis error:", err.Error())
			imageURL = imageSearch(query)
		} else {
			println("hit")
			imageURL = val
		}

		if imageURL == "" {
			c.JSON(500, gin.H{
				"error": "failed to fetch image",
			})
			return
		}

		c.JSON(200, gin.H{
			"url": imageURL,
		})
	})

	err = r.Run(cfg.Address)
	if err != nil {
		panic(err)
	}
}

func imageSearch(query string) string {
	apiURL := "https://api.unsplash.com/search/photos?query=" + url.QueryEscape(query)

	req, err := http.NewRequest("GET", apiURL, nil)
	if err != nil {
		return ""
	}

	authHeader := "Client-ID " + cfg.ApiAuthConfig.UnsplashAccessKey
	req.Header.Set("Authorization", authHeader)

	client := &http.Client{}
	response, err := client.Do(req)
	if err != nil {
		return ""
	}
	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return ""
	}

	var unsplashResp UnsplashResponse
	if err := json.NewDecoder(response.Body).Decode(&unsplashResp); err != nil {
		return ""
	}

	if len(unsplashResp.Results) == 0 {
		return ""
	}

	return unsplashResp.Results[0].URLs.Raw
}
