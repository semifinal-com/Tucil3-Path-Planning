package main

import (
	Control "Backend/Controller"
	DataType "Backend/Model"
	"github.com/gin-contrib/cors"
)
import "github.com/gin-gonic/gin"

func main() {
	r := gin.Default()

	r.Use(cors.Default())

	var data DataType.Graph
	var msg DataType.Message

	r.POST("/", Control.PostHandler(&data, &msg))
	r.GET("/", Control.GetHandler(&data, &msg))

	r.Run()
}
