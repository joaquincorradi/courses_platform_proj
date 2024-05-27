package dto

type CreateCourseRequest struct {
	Title        string `json:"title"`
	Description  string `json:"description"`
	Requirements string `json:"requirements"`
	Rating       string `json:"rating"`
	CourseImage  string `json:"course_image"`
	Category     string `json:"category"`
}

type CreateCourseResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
