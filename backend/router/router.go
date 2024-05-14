package router

import (
	"backend/controllers/courses"
	"backend/controllers/users"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {

	// LOGEO - USER
	engine.POST("/users/signup", users.Signup)
	engine.POST("/users/login", users.Login) // Se mapea la ruta /users/login al controlador de login
	engine.POST("users/validate", middleware.RequiereAuth, users.Validate)

	// CREATE - COURSE
	engine.POST("/courses/create", courses.CreateCourse)
}
