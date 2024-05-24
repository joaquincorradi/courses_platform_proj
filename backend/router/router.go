package router

import (
	"backend/controllers/greeting"

	"github.com/gin-gonic/gin"
)

func MapUrls(engine *gin.Engine) {
	engine.GET("/greet", greeting.Greet)
}
