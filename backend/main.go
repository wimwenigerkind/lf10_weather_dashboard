package main

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/wimwenigerkind/lf10_weather_dashboard/backend/internal/config"
)

func main() {
	cfg := config.LoadConfig()
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

	err := r.Run(cfg.Address)
	if err != nil {
		panic(err)
	}
}
