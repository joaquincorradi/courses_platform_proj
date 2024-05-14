package main

import (
	"backend/initializers"
	"backend/router"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	engine := gin.New()    // Crear una nueva instancia de Gin
	router.MapUrls(engine) // Mapear las URLs
	engine.Run(":8080")
}
