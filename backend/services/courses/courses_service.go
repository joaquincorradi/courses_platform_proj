package courses

import (
	"backend/clients"
	coursesDTO "backend/dto"
	"backend/models"
	"errors"
	"strings"
	"time"
)

func CreateCourse(request coursesDTO.CreateCourseRequest) error {
	if strings.TrimSpace(request.Title) == "" {
		return errors.New("title is required")
	}

	if strings.TrimSpace(request.Description) == "" {
		return errors.New("description is required")
	}

	if strings.TrimSpace(request.Requirements) == "" {
		return errors.New("requirements is required")
	}

	/*if strings.TrimSpace(request.Rating) == "" {
		return errors.New("rating is required")
	}*/

	if strings.TrimSpace(request.CourseImage) == "" {
		return errors.New("courseImage is required")
	}

	if strings.TrimSpace(request.Category) == "" {
		return errors.New("category is required")
	}

	start_date, _ := time.Parse("02 Jan 06 15:04 MST", request.StartDate)

	end_date, _ := time.Parse("02 Jan 06 15:04 MST", request.EndDate)

	course := models.Course{
		Title:        request.Title,
		Description:  request.Description,
		Requirements: request.Requirements,
		StardDate:    start_date,
		EndDate:      end_date,
		Rating:       request.Rating,
		CourseImage:  request.CourseImage,
		Capacity:     request.Capacity,
	}

	err := clients.InsertCourse(course)

	if err != nil {
		return errors.New("error creating course in DB")
	}

	return nil

}
