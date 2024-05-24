package greeting

import (
	greetService "backend/services/greeting"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Greet(c *gin.Context) {
	response := greetService.SendGreeting()
	c.JSON(http.StatusOK, response)
}
