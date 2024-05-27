package users

import (
	"backend/clients"
	"backend/models"
	"errors"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func CreateUser(name string, lastName string, email string, password string) error {
	if strings.TrimSpace(name) == "" {
		return errors.New("name is required")
	}

	if strings.TrimSpace(lastName) == "" {
		return errors.New("lastname is required")
	}

	if strings.TrimSpace(email) == "" {
		return errors.New("email is required")
	}

	if strings.TrimSpace(password) == "" {
		return errors.New("password is required")
	}

	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 10)

	if err != nil {
		return errors.New("error hashing password")
	}

	user := models.User{
		Name:     name,
		Lastname: lastName,
		Email:    email,
		Password: string(hashed),
		Role:     "student",
	}

	err1 := clients.InsertUser(user)

	if err1 != nil {
		return errors.New("error creating user in DB")
	}

	return nil
}

func LoginUser(email string, password string) (string, bool, error) {
	if strings.TrimSpace(email) == "" {
		return "", false, errors.New("email is required")
	}

	if strings.TrimSpace(password) == "" {
		return "", false, errors.New("password is required")
	}

	user, err := clients.SelectUserbyEmail(email)

	if err != nil {
		return "", false, errors.New("error searching in DB")
	}

	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
		return "", false, errors.New("incorrect password")
	}

	// Tenemos la contrasenia autenticada y ahora generamos el token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete token as a string
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		return "", false, errors.New("error signing credentials")
	}

	if user.Role == "admin" {
		return tokenString, true, nil
	} else {
		return tokenString, false, nil
	}
}
