package clients

import (
	"backend/database"
	"backend/models"
	"errors"
)

func InsertUserandCourse(insert models.User_Course) error {

	result := database.DB.Create(&insert)

	if result.Error != nil {
		return errors.New("already inscripted")
	}

	return nil
}
