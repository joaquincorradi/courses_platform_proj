package users

import (
	usersDTO "backend/dto"
	usersService "backend/services/users"
	utils "backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {
	var request usersDTO.CreateUserRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	err := usersService.CreateUser(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized sign-up: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, usersDTO.CreateUserResponse{
		Message: "User with email " + request.Email + " created succesfully!",
	})
}

func LoginUser(c *gin.Context) {
	var request usersDTO.LoginUserRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	tokenstring, err := usersService.LoginUser(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized login: ": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, usersDTO.LoginUserResponse{
		Token: tokenstring,
	})
}

func ValidateUser(c *gin.Context) {
	var request usersDTO.ValidateUserRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	isadmin, err := utils.ValidateUserRole(request.Token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized login: ": err.Error(),
		})
		return
	}

	// Usuario ya validad por tiempo de expiracion. Ahora tenemos si es un admin o no
	if isadmin {
		c.JSON(http.StatusCreated, usersDTO.ValidateUserResponse{
			Message: true,
		})
	} else {
		c.JSON(http.StatusCreated, usersDTO.ValidateUserResponse{
			Message: false,
		})
	}

}

func GetUserByToken(c *gin.Context) {
	var request usersDTO.GetUserRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	user, err := usersService.GetUserByToken(request.Token)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized login: ": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, usersDTO.GetUserResponse{
		Name:     user.Name,
		Lastname: user.Lastname,
		Email:    user.Email,
	})

}
