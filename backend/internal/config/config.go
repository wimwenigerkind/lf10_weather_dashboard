package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	Address       string
	ApiAuthConfig ApiAuthConfig
	RedisConfig   RedisConfig
}

type ApiAuthConfig struct {
	UnsplashAccessKey string
}

type RedisConfig struct {
	Address  string
	Password string
	DB       int
}

func LoadConfig() *Config {
	if _, err := os.Stat(".env"); err == nil {
		log.Println("Loading .env file")
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	return &Config{
		Address: getEnv("ADDRESS", "0.0.0.0:8080"),
		ApiAuthConfig: ApiAuthConfig{
			UnsplashAccessKey: getEnv("UNSPLASH_ACCESS_KEY", ""),
		},
		RedisConfig: RedisConfig{
			Address:  getEnv("REDIS_HOST", "localhost:6379"),
			Password: getEnv("REDIS_PASSWORD", ""),
			DB:       getEnvInt("REDIS_DB", "1"),
		},
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

func getEnvInt(key, defaultValue string) int {
	if value := os.Getenv(key); value != "" {
		if intValue, err := strconv.Atoi(value); err == nil {
			return intValue
		}
	}
	if intDefault, err := strconv.Atoi(defaultValue); err == nil {
		return intDefault
	}
	return 0
}
