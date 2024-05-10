package users

import (
	"backend/model/users"
)

func Login(request users.LoginRequest) users.LoginResponse {
	// Validar conta la base de datos
	return users.LoginResponse{
		Token: "1234abcd",
	}
}
