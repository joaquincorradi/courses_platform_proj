package courses

import (
	"backend/clients"
	coursesDTO "backend/dto"
	"backend/models"
	"errors"
	"strings"
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

	course := models.Course{
		Title:        request.Title,
		Description:  request.Description,
		Requirements: request.Requirements,
		StartDate:    request.StartDate,
		EndDate:      request.EndDate,
		Rating:       request.Rating,
		CourseImage:  request.CourseImage,
		Category:     request.Category,
	}

	err := clients.InsertCourse(course)

	if err != nil {
		return errors.New("error creating course in DB")
	}

	return nil

}

func GetCourses() ([]coursesDTO.Course, error) {

	courses, err := clients.SelectCourse()

	if err != nil {
		return nil, err
	}

	var courseDTOs []coursesDTO.Course

	for _, course := range courses {
		courseDTO := coursesDTO.Course{
			ID:           course.ID,
			Title:        course.Title,
			Description:  course.Description,
			Requirements: course.Requirements,
			StartDate:    course.StartDate,
			EndDate:      course.EndDate,
			Rating:       course.Rating,
			CourseImage:  course.CourseImage,
			Category:     course.Category,
		}
		courseDTOs = append(courseDTOs, courseDTO)
	}
	return courseDTOs, nil
}

func Search(query string) ([]coursesDTO.Course, error) {

	trimmed := strings.TrimSpace(query)

	courses, err := clients.SelectCourseWithFilter(trimmed)

	if err != nil {
		return nil, errors.New("error getting courses from DB")
	}

	courseDTOs := make([]coursesDTO.Course, 0)

	for _, course := range courses {
		courseDTOs = append(courseDTOs, coursesDTO.Course{
			ID:           course.ID,
			Title:        course.Title,
			Description:  course.Description,
			Requirements: course.Requirements,
			StartDate:    course.StartDate,
			EndDate:      course.EndDate,
			Rating:       course.Rating,
			CourseImage:  course.CourseImage,
			Category:     course.Category,
		})
	}
	return courseDTOs, nil
}

// func SoftDeleteCourse() {}

func DeleteCourse(id int) error {
	err := clients.DeleteCourse(id)
	if err != nil {
		return errors.New("error deleting db")
	}

	return nil
}
