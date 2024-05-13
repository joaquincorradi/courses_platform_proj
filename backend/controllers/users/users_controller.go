package users

import (
	usersDomain "backend/model/users"
	UsersService "backend/services/users"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Login(context *gin.Context) { // El objeto de contexto contiene información sobre la solicitud HTTP actual, incluyendo el método de la solicitud, URL, encabezados y cuerpo
	var loginRequest usersDomain.LoginRequest // Se crea una variable de tipo LoginRequest para almacenar los datos del request
	context.BindJSON(&loginRequest)
	response := UsersService.Login(loginRequest) // Se llama al servicio de login y se le pasa el request
	context.JSON(http.StatusOK, response)        // Se responde con el response del servicio
}
