package main

import (
	Control "Backend/Controller"
	DataType "Backend/Model"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// CORS middleware with allowed origin (frontend URL)
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"https://pathplening.vercel.app"} // Replace "http://example.com" with your actual frontend URL
	r.Use(cors.New(config))

	var data DataType.Graph
	var msg DataType.Message

	r.POST("/", Control.PostHandler(&data, &msg))
	r.GET("/", Control.GetHandler(&data, &msg))

	// Run the server on port 8080
	r.Run(":8080")
}
