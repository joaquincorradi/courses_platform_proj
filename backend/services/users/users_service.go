package users

import (
	"backend/clients"
	userDTO "backend/dto"
	"backend/models"
	"errors"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(request userDTO.CreateUserRequest) error {
	if strings.TrimSpace(request.Name) == "" {
		return errors.New("name is required")
	}

	if strings.TrimSpace(request.Lastname) == "" {
		return errors.New("lastname is required")
	}

	if strings.TrimSpace(request.Email) == "" {
		return errors.New("email is required")
	}

	if strings.TrimSpace(request.Password) == "" {
		return errors.New("password is required")
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(request.Password), 10)

	if err != nil {
		return errors.New("error hashing password")
	}

	user := models.User{
		Name:     request.Name,
		Lastname: request.Lastname,
		Email:    request.Email,
		Password: string(hashed),
		Role:     "student",
	}

	err1 := clients.InsertUser(user)

	if err1 != nil {
		return errors.New("error creating user in DB")
	}

	return nil
}

func LoginUser(request userDTO.LoginUserRequest) (string, error) {
	if strings.TrimSpace(request.Email) == "" {
		return "", errors.New("email is required")
	}

	if strings.TrimSpace(request.Password) == "" {
		return "", errors.New("password is required")
	}

	user, err := clients.SelectUserbyEmail(request.Email)

	if err != nil {
		return "", errors.New("error searching in DB")
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)) != nil {
		return "", errors.New("incorrect password")
	}

	// Tenemos la contrasenia autenticada y ahora generamos el token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  user.ID, // sub = id attribute
		"role": user.Role,
		"exp":  time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete token as a string
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		return "", errors.New("error signing credentials")
	}

	return tokenString, nil
}
