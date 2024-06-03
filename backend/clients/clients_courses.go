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

func SelectCourse() ([]models.Course, error) {

	var courses []models.Course

	database.DB.Find(&courses)

	return courses, nil
}

func SelectCourseWithFilter(query string) ([]models.Course, error) {

	var courses []models.Course

	result := database.DB.Where("title LIKE ? OR description LIKE ? OR category LIKE ?", "%"+query+"%", "%"+query+"%", "%"+query+"%").Find(&courses)

	if result.Error != nil {
		return nil, result.Error
	}

	return courses, nil
}
