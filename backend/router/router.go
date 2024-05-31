package router

import (
	coursesController "backend/controllers/courses"
	usersController "backend/controllers/users"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {

	// LOGEO - USER

	engine.POST("/users/signup", usersController.CreateUser)
	engine.POST("/users/login", usersController.LoginUser) // Se mapea la ruta /users/login al controlador de login
	engine.POST("/users/validate", usersController.ValidateUser)
	engine.POST("/courses/create", coursesController.CreateCourse)
	engine.GET("/courses", coursesController.GetCourses)
	engine.GET("/courses/search", coursesController.SearchCourse)

	// CREATE - COURSE
	/*
		engine.POST("/courses/create", courses.CreateCourse)
		engine.POST("/courses/edition", courses.EditCourse)
		engine.POST("courses/delete", courses.DeleteCourse)
	*/
}
