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
