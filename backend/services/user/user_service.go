package user

import (
	"backend/dto"
)

func CreateUserResponse(request dto.CreateUserRequest) dto.CreateUserResponse {
	return dto.CreateUserResponse{
		Message: "User with email " + request.Email + " created successfully!",
	}
}