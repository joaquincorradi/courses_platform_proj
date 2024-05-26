package users

import (
	"backend/dto"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"

	"net/http"
)

func CreateUserResponse(request dto.CreateUserRequest) dto.CreateUserResponse {
	return dto.CreateUserResponse{
		Message: "User with email " + request.Email + " created succesfully!",
	}
}

func HashPasswd(c *gin.Context, pwd string) []byte {
	hashed, err := bcrypt.GenerateFromPassword([]byte(pwd), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ERROR hash password",
		})
	}

	return hashed
}
