package courses

import (
	coursesDomain "backend/domain/courses"
	coursesService "backend/services/courses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func CreateCourse(context *gin.Context) {
	var createCourseRequest coursesDomain.CreateCourseRequest
	context.BindJSON(&createCourseRequest)
	response := coursesService.CreateCourse(createCourseRequest)
	context.JSON(http.StatusCreated, response)
}
