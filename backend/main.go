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
	engine := gin.New()    // Crea una nueva instancia de Gin que se almacena en la variable 'engine'. gin.New() crea un nuevo motor Gin
	router.MapUrls(engine) // Mapea las URLs a las funciones que se encargarán de manejar las request HTTP (controladores)
	engine.Run(":8080")    // Inicia el servidor web de Gin y le indica que escuche en el puerto 8080
}
