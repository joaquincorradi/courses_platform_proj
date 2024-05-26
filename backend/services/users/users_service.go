package users

import (
	"backend/clients"
	"backend/models"
	"errors"
	"strings"

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

/*func HashPasswd(c *gin.Context, pwd string) []byte {
	hashed, err := bcrypt.GenerateFromPassword([]byte(pwd), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ERROR hash password",
		})
	}

	return hashed
}
*/
