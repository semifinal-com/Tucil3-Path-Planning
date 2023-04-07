package Model

type Link struct {
	To   *Node
	Dist float64
}

type Graph struct {
	nodes []*Node
	Links map[*Node][]*Link
}

// READ FILE
func (g *Graph) readMatrix(adj [][]int, ns []*Node) {
	for i := 0; i < len(adj); i++ {

	}
}
