package clients

import (
	"backend/database"
	"backend/models"
	"errors"
)

func InsertCourse(courseInsert models.Course) error {

	result := database.DB.Create(&courseInsert)

	if result.Error != nil {
		return errors.New("course is already created")
	}

	return nil
}
