// package main

// import C "Backend/Controller"
// import "github.com/gin-gonic/gin"

// func main() {
// 	r := gin.Default()

// 	userCtrl := C.UserController{}

// 	userRoutes := r.Group("/users")
// 	{
// 		userRoutes.GET("", userCtrl.GetUsers)
// 		userRoutes.POST("", userCtrl.CreateUser)
// 		userRoutes.PUT("/:id", userCtrl.UpdateUser)
// 		userRoutes.DELETE("/:id", userCtrl.DeleteUser)
// 	}

// 	r.Run()
// }

package main

import C "Backend/Controller"
import "github.com/gin-gonic/gin"

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

	userCtrl := C.UserController{}

	userRoutes := r.Group("/users")
	{
		userRoutes.GET("", userCtrl.GetUsers)
		userRoutes.POST("", userCtrl.CreateUser)
		userRoutes.PUT("/:id", userCtrl.UpdateUser)
		userRoutes.DELETE("/:id", userCtrl.DeleteUser)
	}

	r.Run()
}
