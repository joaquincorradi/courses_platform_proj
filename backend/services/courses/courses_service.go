package courses

import (
	"backend/domain/courses"
)

func CreateCourse(request courses.CreateCourseRequest) courses.CreateCourseResponse {
	// Crear el curso en la base de datos
	return courses.CreateCourseResponse{
		ID:   "1234abcd",
		Name: request.Name,
	}
}
