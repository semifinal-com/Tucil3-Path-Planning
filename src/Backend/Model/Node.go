package DataType

import (
	"fmt"
	"math"
)

type Node struct {
	Id   int
	Name string
	Coor struct {
		X float64
		Y float64
	}
}

func (n Node) Distance(o Node) float64 {
	return math.Sqrt(math.Pow(n.Coor.X-o.Coor.X, 2) + math.Pow(n.Coor.Y-o.Coor.Y, 2))
}

func (n Node) PrintNode() {
	fmt.Printf("ID	: %d\n", n.Id)
	fmt.Printf("Nama	: %s\n", n.Name)
	fmt.Printf("Coor	: (%f, %f)\n", n.Coor.X, n.Coor.Y)
}
