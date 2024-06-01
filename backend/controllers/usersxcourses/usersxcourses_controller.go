package usersxcourses

import (
	usersxcoursesDTO "backend/dto"
	user_controllerService "backend/services/users_courses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InscriptionUserCourse(c *gin.Context) {

	var request usersxcoursesDTO.InscriptionRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	err := user_controllerService.InscriptionUserCourse(request)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized sign-up: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, usersxcoursesDTO.CreateUserResponse{
		Message: "User inscripted in course succesfully!",
	})

}
