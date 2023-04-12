package Controller

import (
	DataType "Backend/Model"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
)

func PostHandler(data *DataType.Graph, msg *DataType.Message) gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "POST" {
			msg.SetDefault()
			requestBody, err := ioutil.ReadAll(c.Request.Body)
			var nodes []DataType.Node
			matrix, from, to, algo := DataType.Json2Nodes(requestBody, &nodes)
			var g DataType.Graph
			g.CreateGraph(nodes, matrix)

			if algo == "UCS" {
				fmt.Println("UCS")
				res, dist := DataType.UCS(&g, &nodes[from], &nodes[to])
				(*msg).Nodes = res
				(*msg).Distance = dist
				(*msg).Route += res[0].Name
				for i := 1; i < len(res); i++ {
					(*msg).Route += " - " + res[i].Name
				}

			}
			if algo == "A*" {
				fmt.Println("A*")
				res, dist := DataType.Astar(&g, &nodes[from], &nodes[to], nodes)
				(*msg).Nodes = res
				(*msg).Distance = dist
				(*msg).Route += res[0].Name
				for i := 1; i < len(res); i++ {
					(*msg).Route += " - " + res[i].Name
				}
			}
			(*msg).Status = true
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
			if !msg.Status {
				c.JSON(http.StatusOK, gin.H{
					"message": "we haven't cook",
				})
				return
			}
			c.JSON(http.StatusOK, gin.H{
				"status":   http.StatusOK,
				"routestr": msg.Route,
				"result":   msg.Nodes,
				"distance": msg.Distance,
				"numstep":  len(msg.Nodes),
			})
		}
	}
}
