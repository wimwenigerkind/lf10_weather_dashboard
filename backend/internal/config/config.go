package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Address string
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
		Address: getEnv("ADDRESS", "127.0.0.1:8080"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
