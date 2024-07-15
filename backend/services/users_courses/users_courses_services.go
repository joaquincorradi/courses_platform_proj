package users_courses

import (
	"backend/clients"
	usersCoursesDTO "backend/dto"
	"backend/models"
	utils "backend/utils"
	"errors"
	"strconv"
)

func InscriptionUserCourse(request usersCoursesDTO.InscriptionRequest) error {
	// recibimos el token y el id del curso

	id_user, err := utils.GetIdByToken(request.Token)
	if err != nil {
		return errors.New("error finding user")
	}

	inscription := models.User_Course{
		UserID:   id_user,
		CourseID: request.ID,
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

	id, err := utils.GetIdByToken(request.Token)

	if err != nil {
		return errors.New("error finding user")
	}

	check, err := utils.CheckInscription(id, request.CourseID)

	if !check || err != nil {
		return errors.New("you are not inscripted in this course")
	}

	comment := models.Feedback{
		UserID:   id,
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

func GetAverageRating(request usersCoursesDTO.GetAverageRatingRequest) (float64, error) {
	average, err := clients.SelectAverageRating(request.CourseID)

	if err != nil {
		return 0, errors.New("error selecting average rating")
	}

	return average, nil
}

func GetCourseAndComments(id string) (usersCoursesDTO.Course, []usersCoursesDTO.Feedback, error) {

	id_int, err := strconv.Atoi(id)

	if err != nil {
		return usersCoursesDTO.Course{}, nil, errors.New("error converting id to int")
	}

	course, err := clients.SelectCourseById(id_int)

	if err != nil {
		return usersCoursesDTO.Course{}, nil, errors.New("error selecting course")
	}

	comments, err := clients.SelectComments(id_int)

	if err != nil {
		return usersCoursesDTO.Course{}, nil, errors.New("error selecting comments")
	}

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

	var commentsDTOs []usersCoursesDTO.Feedback

	for _, comment := range comments {
		commentDTO := usersCoursesDTO.Feedback{
			UserID:   comment.UserID,
			CourseID: comment.CourseID,
			Comment:  comment.Comment,
			Rating:   comment.Rating,
		}
		commentsDTOs = append(commentsDTOs, commentDTO)
	}

	return courseDTO, commentsDTOs, nil
}

func GetCourseAndCommentsAndFiles(id string) (usersCoursesDTO.Course, []usersCoursesDTO.Feedback, []usersCoursesDTO.File, error) {

	id_int, err := strconv.Atoi(id)

	if err != nil {
		return usersCoursesDTO.Course{}, nil, nil, errors.New("error converting id to int")
	}

	course, err := clients.SelectCourseById(id_int)

	if err != nil {
		return usersCoursesDTO.Course{}, nil, nil, errors.New("error selecting course")
	}

	comments, err := clients.SelectComments(id_int)

	if err != nil {
		return usersCoursesDTO.Course{}, nil, nil, errors.New("error selecting comments")
	}

	files, err := clients.SelectFiles(id_int)

	if err != nil {
		return usersCoursesDTO.Course{}, nil, nil, errors.New("error selecting files")
	}

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

	var commentsDTOs []usersCoursesDTO.Feedback

	for _, comment := range comments {
		commentDTO := usersCoursesDTO.Feedback{
			UserID:   comment.UserID,
			CourseID: comment.CourseID,
			Comment:  comment.Comment,
			Rating:   comment.Rating,
		}
		commentsDTOs = append(commentsDTOs, commentDTO)
	}

	var filesDTOs []usersCoursesDTO.File

	for _, file := range files {
		fileDTO := usersCoursesDTO.File{
			UserID:   file.UserID,
			CourseID: file.CourseID,
			FileName: file.FileName,
		}
		filesDTOs = append(filesDTOs, fileDTO)
	}

	return courseDTO, commentsDTOs, filesDTOs, nil
}

func CreateFile(request usersCoursesDTO.CreateFileRequest) error {

	id, err := utils.GetIdByToken(request.Token)

	if err != nil {
		return errors.New("error finding user")
	}

	check, err := utils.CheckInscription(id, request.CourseID)

	if !check || err != nil {
		return errors.New("you are not inscripted in this course")
	}

	file := models.File{
		UserID:   id,
		CourseID: request.CourseID,
		FileName: request.FileName,
	}

	err1 := clients.InsertFile(file)

	if err1 != nil {
		return errors.New("error inserting file")
	}

	return nil
}
