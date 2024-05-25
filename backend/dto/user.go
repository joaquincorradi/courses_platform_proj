package dto

type CreateUserRequest struct {
	Email string `json:"email"`
	Password    string `json:"password"`
}

type CreateUserResponse struct {
	Message string `json:"message"`
}