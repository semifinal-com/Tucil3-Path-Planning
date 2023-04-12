package Controller

import (
	DataType "Backend/Model"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
)

func PostHandler(data *DataType.Graph, msg *DataType.Message) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "POST" {
			requestBody, err := ioutil.ReadAll(c.Request.Body)
			var nodes []DataType.Node
			matrix, from, to, algo := DataType.Json2Nodes(requestBody, &nodes)
			var g DataType.Graph
			g.CreateGraph(nodes, matrix)

			if algo == "UCS" {
				res := DataType.UCS(&g, &nodes[from], &nodes[to])
				for _, node := range res {
					node.PrintNode()
				}
			}
			if algo == "A" {
				res := DataType.Astar(&g, &nodes[from], &nodes[to], nodes)
				for _, node := range res {
					node.PrintNode()
				}
			}

			if err != nil {
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"status": http.StatusOK,
			})
		}
	}
}

func GetHandler(data *DataType.Graph, msg *DataType.Message) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "GET" {
			if data == nil {
				c.JSON(http.StatusOK, gin.H{
					"message": "we haven't cook",
				})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"status": http.StatusOK,
			})
		}
	}
}
