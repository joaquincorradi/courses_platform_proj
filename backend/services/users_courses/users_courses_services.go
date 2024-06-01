package users_courses

import (
	"backend/clients"
	userxcoursesDTO "backend/dto"
	"backend/models"
	utils "backend/utils"
	"errors"
	"time"
)

func InscriptionUserCourse(request userxcoursesDTO.InscriptionRequest) error {
	// recibimos el token y el id del curso

	id_user, err := utils.GetIdByToken(request.Token)
	if err != nil {
		return errors.New("error finding user")
	}

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
