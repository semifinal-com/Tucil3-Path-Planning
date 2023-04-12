package DataType

type Message struct {
	Route    string
	Distance float64
	Nodes    []*Node
	Status   bool
}
