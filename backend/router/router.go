package router

import (
	"backend/controllers/courses"
	"backend/controllers/users"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {

	// LOGEO - USER
	engine.POST("/users/signup", users.CreateUser)
	engine.POST("/users/login", users.LoginUser) // Se mapea la ruta /users/login al controlador de login
	engine.POST("courses/create", courses.CreateCourse)

	// CREATE - COURSE
	/*
		engine.POST("/courses/create", courses.CreateCourse)
			engine.POST("/courses/edition", courses.EditCourse)
			engine.POST("courses/delete", courses.DeleteCourse)
	*/
}
