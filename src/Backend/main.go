// package main

// import C "Backend/Controller"
// import "github.com/gin-gonic/gin"

// func main() {
// 	r := gin.Default()

// 	userCtrl := C.UserController{}

// 	userRoutes := r.Group("/users")
// 	{
// 		userRoutes.GET("", userCtrl.GetUsers)
// 		userRoutes.POST("", userCtrl.CreateUser)
// 		userRoutes.PUT("/:id", userCtrl.UpdateUser)
// 		userRoutes.DELETE("/:id", userCtrl.DeleteUser)
// 	}

// 	r.Run()
// }

package main

import (
	DataType "Backend/Model"
	"fmt"
)

func main() {
	jsonText := []byte(`{
       "nodes": [
           {
               "id": 0,
               "name": "A",
               "coor": [0,0]
           },
           {
               "id": 1,
               "name": "B",
               "coor": [2,2]
           },
           {
               "id": 2,
               "name": "C",
               "coor": [4,0]
           },
           {

               "id": 3,
               "name": "D",
               "coor": [1,3]
           },
           {
               "id": 4,
               "name": "E",
               "coor": [4,4]
           }
       ],

       "mat": [
           [1, 1, 0, 0, 0],
           [1, 1, 1, 0, 0],
           [0, 1, 1, 1, 0],
           [0, 0, 1, 1, 1],
           [0, 0, 0, 1, 1]
       ]
   }`)
	var listA []DataType.Node

	a := DataType.Json2Nodes(jsonText, &listA)

	for _, x := range listA {
		x.PrintNode()
	}

	var graph DataType.Graph
	graph.CreateGraph(listA, a)

	//res := DataType.UCS(&graph, &listA[0], &listA[4])
	//g *Graph, From, To *Node, nodes []Node
	res := DataType.Astar(&graph, &listA[0], &listA[4], listA)

	fmt.Println("\nRESULT")
	for _, node := range res {
		node.PrintNode()
	}

	//r := gin.Default()
	//r.GET("/ping", func(c *gin.Context) {
	//	c.JSON(http.StatusOK, gin.H{
	//		"message": "pong",
	//	})
	//})
	//r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
