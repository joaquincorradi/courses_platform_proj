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

	result := database.DB.Table("courses").Select("courses.id, courses.title, courses.description, courses.requirements, courses.start_date, courses.end_date, courses.course_image, courses.category").Joins("JOIN user_courses ON courses.id = user_courses.course_id").Where("user_courses.user_id = ?", id_user).Scan(&courses)

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

func SelectAverageRating(id_course int) (float64, error) {
	var averageRating float64

	result := database.DB.Table("feedbacks").Select("AVG(rating)").Where("course_id = ?", id_course).Scan(&averageRating)

	if result.Error != nil {
		return 0, errors.New("error selecting average rating")
	}

	return averageRating, nil
}

func SelectComments(id_course int) ([]models.Feedback, error) {
	var comments []models.Feedback

	result := database.DB.Table("feedbacks").Where("course_id = ?", id_course).Scan(&comments)

	if result.Error != nil {
		return nil, errors.New("error selecting comments")
	}

	return comments, nil
}

func SelectInscription(id_user, id_course int) (models.User_Course, error) {
	var inscription models.User_Course

	result := database.DB.Where("user_id = ? AND course_id = ?", id_user, id_course).First(&inscription)

	if result.Error != nil {
		return models.User_Course{}, errors.New("error selecting inscription")
	}

	return inscription, nil
}

func SelectFiles(id_course int) ([]models.File, error) {
	var files []models.File

	result := database.DB.Table("files").Where("course_id = ?", id_course).Scan(&files)

	if result.Error != nil {
		return nil, errors.New("error selecting files")
	}

	return files, nil
}

func InsertFile(file models.File) error {
	result := database.DB.Create(&file)

	if result.Error != nil {
		return errors.New("error inserting file")
	}

	return nil
}
