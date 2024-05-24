package greeting

import (
	"backend/dto"
)

func SendGreeting() dto.GreetingResponse {
	return dto.GreetingResponse{
		Message: "Hola desde el backend",
	}
}
