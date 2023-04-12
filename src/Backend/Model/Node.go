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

func (n Node) DistanceHaversine(o Node) float64 {
	lat1 := n.Coor.X
	lat2 := o.Coor.X
	lon1 := n.Coor.Y
	lon2 := o.Coor.Y

	rad := func(x float64) float64 {
		return x * math.Pi / 180
	}

	var R float64 = 6371 // km
	dLat := rad(lat2 - lat1)
	dLon := rad(lon2 - lon1)
	lat1 = rad(lat1)
	lat2 = rad(lat2)

	a := math.Sin(dLat/2)*math.Sin(dLat/2) + math.Sin(dLon/2)*math.Sin(dLon/2)*math.Cos(lat1)*math.Cos(lat2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))
	d := R * c

	return d
}

func (n Node) PrintNode() {
	fmt.Printf("ID	: %d\n", n.Id)
	fmt.Printf("Nama	: %s\n", n.Name)
	fmt.Printf("Coor	: (%f, %f)\n", n.Coor.X, n.Coor.Y)
}
