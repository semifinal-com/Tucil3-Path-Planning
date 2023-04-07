package Model

import "math"

type Node struct {
	id   int
	name string
	coor struct {
		y float64
		x float64
	}
}

func (n Node) distance(o Node) float64 {
	return math.Sqrt(math.Pow(n.coor.x-o.coor.x, 2) + math.Pow(n.coor.y-o.coor.y, 2))
}
