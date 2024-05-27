package courses

import (
	coursesDTO "backend/dto"
	coursesService "backend/services/courses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {

	var request coursesDTO.CreateCourseRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	err := coursesService.CreateCourse(request.Title, request.Description, request.Requirements, request.Rating, request.CourseImage, request.Category)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized sign-up: ": err.Error(),
		})

		return
	}
}
