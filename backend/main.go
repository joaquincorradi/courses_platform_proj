package main

import (
	"backend/router"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	engine := gin.New() // Crea una nueva instancia de Gin que se almacena en la variable 'engine'. gin.New() crea un nuevo motor Gin

	// Configuración de CORS
	engine.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	router.MapUrls(engine) // Mapea las URLs a las funciones que se encargarán de manejar las request HTTP (controladores)
	engine.Run(":8080")    // Inicia el servidor web de Gin y le indica que escuche en el puerto 8080
}
