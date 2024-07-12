package users_courses

import (
	"backend/clients"
	usersCoursesDTO "backend/dto"
	"backend/models"
	utils "backend/utils"
	"errors"
	"time"
)

func InscriptionUserCourse(request usersCoursesDTO.InscriptionRequest) error {
	// recibimos el token y el id del curso

	id_user, err := utils.GetIdByToken(request.Token)
	if err != nil {
		return errors.New("error finding user")
	}

	// courseExist(request.ID)

	inscription := models.User_Course{
		UserID:   id_user,
		CourseID: request.ID,
		Date:     time.Now(),
	}

	err1 := clients.InsertUserandCourse(inscription)
	if err1 != nil {
		return errors.New("error inserting data to users_courses")
	}

	return nil
}

func GetUserCourses(request usersCoursesDTO.GetUserCoursesRequest) ([]usersCoursesDTO.Course, error) {

	id_user, err := utils.GetIdByToken(request.Token)

	if err != nil {
		return nil, errors.New("error finding user")
	}

	courses, err := clients.SelectUserCourses(id_user)

	if err != nil {
		return nil, errors.New("error selecting user courses")
	}

	var courseDTOs []usersCoursesDTO.Course

	for _, course := range courses {
		courseDTO := usersCoursesDTO.Course{
			ID:           course.ID,
			Title:        course.Title,
			Description:  course.Description,
			Requirements: course.Requirements,
			StartDate:    course.StartDate,
			EndDate:      course.EndDate,
			CourseImage:  course.CourseImage,
			Category:     course.Category,
		}
		courseDTOs = append(courseDTOs, courseDTO)
	}
	return courseDTOs, nil
}

func CreateComment(request usersCoursesDTO.CreateCommentRequest) error {
	id_user, err := utils.GetIdByToken(request.Token)

	if err != nil {
		return errors.New("error finding user")
	}

	comment := models.Feedback{
		UserID:   id_user,
		CourseID: request.CourseID,
		Comment:  request.Comment,
		Rating:   request.Rating,
	}

	err1 := clients.InsertComment(comment)

	if err1 != nil {
		return errors.New("error inserting comment")
	}

	return nil
}
