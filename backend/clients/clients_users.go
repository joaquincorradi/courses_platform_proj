package clients

import (
	"backend/database"
	"backend/models"
	"errors"
)

func InsertUser(userInsert models.User) error {
	result := database.DB.Create(&userInsert)

	if result.Error != nil {
		return errors.New("user is already signed up")
	}

	return nil
}

func SelectUserbyEmail(email string) (models.User, error) {
	var user models.User

	database.DB.First(&user, "email = ?", email)

	if user.ID == 0 {
		return user, errors.New("user not found")
	}

	return user, nil
}

func SelectUserbyID(id interface{}) (models.User, error) {
	var user models.User

	database.DB.First(&user, id)

	if user.ID == 0 {
		return user, errors.New("user not found")
	}

	return user, nil
}
