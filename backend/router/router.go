package router

import (
	coursesController "backend/controllers/courses"
	usersController "backend/controllers/users"
	usersCoursesController "backend/controllers/users_courses"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {

	//USER
	engine.POST("/users/signup", usersController.CreateUser)
	engine.POST("/users/login", usersController.LoginUser)
	engine.POST("/users/validate", usersController.ValidateUser)
	engine.POST("/users", usersController.GetUserByToken)

	// COURSE
	engine.POST("/courses/create", coursesController.CreateCourse)
	engine.GET("/courses", coursesController.GetCourses)
	engine.GET("/courses/search", coursesController.SearchCourse)
	engine.POST("courses/delete", coursesController.DeleteCourse)
	engine.GET("/courses/:id", usersCoursesController.GetCourseAndComments)

	// INSCRIPTION AND MY COURSES
	engine.POST("/inscription", usersCoursesController.InscriptionUserCourse)
	engine.POST("/my_courses", usersCoursesController.GetUserCourses)

	// COMMENTS AND RATING
	engine.POST("/comments", usersCoursesController.CreateComment)
	engine.POST("/comments/rating", usersCoursesController.GetAverageRating)
}
