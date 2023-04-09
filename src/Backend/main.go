package main

import (
	DataType "Backend/Model"
	"fmt"
)

//func json2Graph(jsonData []byte) {
//	var parse struct {
//		Nodes []*struct {
//			ID   int        `json:":"id"`
//			Name string     `json:"name"`
//			Coor [2]float64 `json:"coor"`
//		} `json:"nodes"`
//		AdjMat [][]int `json:"mat"`
//	}
//
//	err := json.Unmarshal(jsonData, &parse)
//	if err != nil {
//		panic(err)
//	}
//
//	for i := 0; i < len(parse.Nodes); i++ {
//		fmt.Printf("(%d, %s, [%f,%f])", parse.Nodes[i].ID, parse.Nodes[i].Name, parse.Nodes[i].Coor[0], parse.Nodes[i].Coor[1])
//	}
//}

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
                "coor": [0,4]
            },
            {
                "id": 4,
                "name": "E",
                "coor": [4,4]
            }
        ],

        "mat": [
            [0, 1, 1, 1, 0],
            [1, 0, 1, 1, 1],
            [1, 1, 0, 0, 1],
            [1, 1, 0, 0, 1],
            [0, 1, 1, 1, 0]
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
