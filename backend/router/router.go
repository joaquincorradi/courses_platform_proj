package router

import (
	coursesController "backend/controllers/courses"
	usersController "backend/controllers/users"
	users_coursesController "backend/controllers/usersxcourses"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {

	//USER
	engine.POST("/users/signup", usersController.CreateUser)
	engine.POST("/users/login", usersController.LoginUser) // Se mapea la ruta /users/login al controlador de login
	engine.POST("/users/validate", usersController.ValidateUser)
	engine.POST("/users", usersController.GetUser)

	// COURSE
	engine.POST("/courses/create", coursesController.CreateCourse)
	engine.GET("/courses", coursesController.GetCourses)
	engine.GET("/courses/search", coursesController.SearchCourse)
	engine.POST("courses/delete", coursesController.DeleteCourse)
	engine.GET("/courses/:id", coursesController.ShowCourse)

	// INSCRIPTION
	engine.POST("users_courses/inscription", users_coursesController.InscriptionUserCourse)

}
