package main

import (
	DataType "Backend/Model"
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
                "name": "Perempatan Buah Batu",
                "coor": [107.633415, -6.948015]
            },
            {
                "id": 1,
                "name": "Perempatan Carrefour Kiaracondong",
                "coor": [107.64187124744149, -6.945518546605408]
            }
        ],

        "mat": [
            [0, 1],
            [1, 0]
        ]
    }`)
	var listA []DataType.Node

	a := DataType.Json2Nodes(jsonText, &listA)

	var graph DataType.Graph
	graph.CreateGraph(listA, a)
	graph.PrintGraph()
	//r := gin.Default()
	//r.GET("/ping", func(c *gin.Context) {
	//	c.JSON(http.StatusOK, gin.H{
	//		"message": "pong",
	//	})
	//})
	//r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
