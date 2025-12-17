package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Address       string
	ApiAuthConfig ApiAuthConfig
}

type ApiAuthConfig struct {
	UnsplashAccessKey string
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
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
