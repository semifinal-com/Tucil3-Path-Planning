package DataType

type Route struct {
	Cost  float64
	Nodes []*Node
}

type PrioQueue []*Route

func (pq PrioQueue) Less(i, j int) bool {
	return pq[i].Cost < pq[j].Cost
}

func (pq *PrioQueue) Swap(i, j int) {
	temp := (*pq)[j]
	(*pq)[j] = (*pq)[i]
	(*pq)[i] = temp
}

func (pq *PrioQueue) Push(newRoute Route) {
	*pq = append(*pq, &newRoute)
	canSwap := true
	for i := len(*pq) - 1; i > 0 && canSwap; i-- {
		if pq.Less(i, i-1) {
			pq.Swap(i, i-1)
		} else {
			canSwap = false
		}
	}
}

func (pq *PrioQueue) Pop() Route {
	Top := Route{Cost: (*pq)[0].Cost, Nodes: (*pq)[0].Nodes}
	*pq = (*pq)[1:]
	return Top
}
