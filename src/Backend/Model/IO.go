package DataType

type Message struct {
	Route    string
	Distance float64
	Nodes    []*Node
	Status   bool
}

func (m *Message) SetDefault() {
	m.Route = ""
	m.Distance = 0
	m.Nodes = nil
	m.Status = false
}
