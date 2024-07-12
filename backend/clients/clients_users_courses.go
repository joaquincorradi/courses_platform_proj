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

func SelectUserCourses(id_user int) ([]models.Course, error) {
	var courses []models.Course

	result := database.DB.Table("courses").Select("courses.id, courses.title, courses.description, courses.requirements, courses.start_date, courses.end_date").Joins("JOIN user_courses ON courses.id = user_courses.course_id").Where("user_courses.user_id = ?", id_user).Scan(&courses)

	if result.Error != nil {
		return nil, errors.New("error selecting user courses")
	}

	return courses, nil
}

func InsertComment(commentInsert models.Feedback) error {
	result := database.DB.Create(&commentInsert)

	if result.Error != nil {
		return errors.New("you have already commented in this course")
	}

	return nil
}
