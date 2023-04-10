package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserController struct{}

func (ctrl UserController) GetUsers(c *gin.Context) {
	// Your logic to get users data
	users := []string{"Alice", "Bob", "Charlie"}

	// Set response status code and data
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   users,
	})
}

func (ctrl UserController) CreateUser(c *gin.Context) {
	// Your logic to create new user
	userName := c.PostForm("name")

	// Set response status code and data
	c.JSON(http.StatusCreated, gin.H{
		"status": http.StatusCreated,
		"data":   userName,
	})
}

func (ctrl UserController) UpdateUser(c *gin.Context) {
	// Your logic to update user
	userID := c.Param("id")

	// Set response status code and data
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   userID,
	})
}

func (ctrl UserController) DeleteUser(c *gin.Context) {
	// Your logic to delete user
	userID := c.Param("id")

	// Set response status code and data
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"data":   userID,
	})
}
