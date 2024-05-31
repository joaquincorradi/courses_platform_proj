package courses

import (
	coursesDTO "backend/dto"
	coursesService "backend/services/courses"
	"net/http"
	"strings"

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

	c.JSON(http.StatusCreated, gin.H{
		"Mensaje": "Se creó el curso correctamente",
	})
}

func GetCourses(c *gin.Context) {

	courseDTOs, err := coursesService.GetCourses()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err,
		})

		return
	}

	c.JSON(http.StatusOK, coursesDTO.GetCourseResponse{
		Courses: courseDTOs,
	})
}

func SearchCourse(c *gin.Context) {

	query := strings.TrimSpace(c.Query("q"))

	courses_filter, err := coursesService.Search(query)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Hola",
		})

		return
	}

	c.JSON(http.StatusOK, coursesDTO.SearchResponse{
		Courses_Filter: courses_filter,
	})
}
