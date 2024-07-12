package usersxcourses

import (
	usersxcoursesDTO "backend/dto"
	user_coursesService "backend/services/users_courses"
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

	err := user_coursesService.InscriptionUserCourse(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized sign-up: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, usersxcoursesDTO.InscriptionResponse{
		Message: "User inscripted in course succesfully!",
	})

}

func GetUserCourses(c *gin.Context) {

	var request usersxcoursesDTO.GetUserCoursesRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	courseDTOs, err := user_coursesService.GetUserCourses(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized request: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, usersxcoursesDTO.GetUserCoursesResponse{
		Courses: courseDTOs,
	})
}
