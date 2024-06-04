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

func SelectCourseById(id int) (models.Course, error) {
	var course models.Course

	database.DB.Find(&course, "id = ?", id)
	if course.ID == 0 {
		return course, errors.New("course not found")
	}

	return course, nil
}

// func SoftDeleteCourse(id int) error {
// 	course := SelectCourseById(id)

// 	database.DB.
// }

func DeleteCourse(id int) error {
	course, err := SelectCourseById(id)
	if err != nil {
		return errors.New("course not found")
	}

	database.DB.Delete(&course, "id = ?", id)

	return nil
}
