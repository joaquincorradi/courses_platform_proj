package user

import (
	userDTO "backend/dto"
	userService "backend/services/user"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var request userDTO.CreateUserRequest
	if err := c.BindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
	}
	response := userService.CreateUserResponse(request)
	c.JSON(http.StatusCreated, response)
}