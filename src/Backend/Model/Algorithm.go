package DataType

func UCS(g *Graph, From, To *Node) ([]*Node, float64) {
	queue := PrioQueue{&Route{Nodes: []*Node{From}}}
	visit := make(map[*Node]bool)
	for len(queue) > 0 {
		currRoute := queue.Pop()
		currNode := currRoute.Nodes[len(currRoute.Nodes)-1]
		if currNode == To {
			return currRoute.Nodes, currRoute.Cost
		}
		if visit[currNode] {
			continue
		}
		visit[currNode] = true
		for _, link := range g.Links[currNode] {
			newRoute := &Route{Cost: currRoute.Cost + link.Dist}
			newRoute.Nodes = make([]*Node, len(currRoute.Nodes))
			copy(newRoute.Nodes, currRoute.Nodes)
			newRoute.Nodes = append(newRoute.Nodes, link.To)
			queue.Push(*newRoute)
		}
	}
	return nil, -1
}

func Astar(g *Graph, From, To *Node, nodes []Node) ([]*Node, float64) {
	heur := CreateHeuristic(nodes, To)
	queue := PrioQueue{&Route{Nodes: []*Node{From}, Cost: heur[From]}}

	for len(queue) > 0 {
		currRoute := queue.Pop()
		currNode := currRoute.Nodes[len(currRoute.Nodes)-1]
		if currNode == To {
			return currRoute.Nodes, currRoute.Cost
		}
		for _, link := range g.Links[currNode] {
			newRoute := &Route{Cost: currRoute.Cost + link.Dist}
			newRoute.Nodes = make([]*Node, len(currRoute.Nodes))
			copy(newRoute.Nodes, currRoute.Nodes)
			newRoute.Nodes = append(newRoute.Nodes, link.To)
			newRoute.Cost += heur[link.To]
			queue.Push(*newRoute)
		}
	}
	return nil, -1
}

func CreateHeuristic(nodes []Node, To *Node) map[*Node]float64 {
	heurist := make(map[*Node]float64)
	for _, node := range nodes {
		heurist[&node] = node.Distance(*To)
	}
	return heurist
}
