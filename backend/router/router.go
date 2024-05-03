package router

import (
	"backend/controllers/courses"
	"backend/controllers/users"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {
	engine.POST("/users/login", users.Login) // Se mapea la ruta /users/login al controlador de login
	engine.POST("/courses/create", courses.CreateCourse)
}
