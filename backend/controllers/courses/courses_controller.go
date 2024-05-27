package courses

import (
	coursesDTO "backend/dto"
	coursesService "backend/services/courses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateCourse(c *gin.Context) {

	var request coursesDTO.CreateCourseRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	err := coursesService.CreateCourse(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized request: ": err.Error(),
		})

		return
	}
}
