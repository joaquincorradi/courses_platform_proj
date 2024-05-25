package router

import (
	"backend/controllers/greeting"
	"backend/controllers/user"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {
	engine.GET("/greet", greeting.Greet)
	engine.POST("/createUser", user.CreateUser)
}
