package dto

type User struct {
	Name     string `json:"name"`
	Lastname string `json:"lastname"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type CreateUserRequest struct {
	Name     string `json:"name"`
	Lastname string `json:"lastname"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type CreateUserResponse struct {
	Message string `json:"message"`
}

type LoginUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginUserResponse struct {
	Token string `json:"token"`
}

type ValidateUserRequest struct {
	Token string `json:"token"`
}

type ValidateUserResponse struct {
	Message bool `json:"isAdmin"`
}

type GetUserRequest struct {
	Token string `json:"token"`
}

type GetUserResponse struct {
	Name     string `json:"name"`
	Lastname string `json:"lastname"`
	Email    string `json:"email"`
}
