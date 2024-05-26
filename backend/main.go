package main

import (
	"backend/database"
	"backend/initializers"
	"backend/router"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

			if c.Request.Method == "OPTIONS" {
					c.AbortWithStatus(204)
					return
			}

			c.Next()
	}
}

func main() {
	database.ConnectToDB() // Conecta a la base de datos de cada uno para poder almacenar la información
	engine := gin.New()    // Crea una nueva instancia de Gin que se almacena en la variable 'engine'. gin.New() crea un nuevo motor Gin
	engine.Use(CORSMiddleware())
	router.MapUrls(engine) // Mapea las URLs a las funciones que se encargarán de manejar las request HTTP (controladores)
	engine.Run(":8080")    // Inicia el servidor web de Gin y le indica que escuche en el puerto 8080
}