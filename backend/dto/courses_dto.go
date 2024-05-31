package dto

type CreateCourseRequest struct {
	Title        string `json:"title"`
	Description  string `json:"description"`
	Requirements string `json:"requirements"`
	StartDate    string `json:"start_date"`
	EndDate      string `json:"end_date"`
	Rating       int    `json:"rating"`
	CourseImage  string `json:"course_image"`
	Category     string `json:"category"`
	Capacity     int    `json:"capacity"`
}

type CreateCourseResponse struct {
	Message string `json:"message"`
}

type Course struct {
	ID           int    `json:"id"`
	Title        string `json:"title"`
	Description  string `json:"description"`
	Requirements string `json:"requirements"`
	StartDate    string `json:"start_date"`
	EndDate      string `json:"end_date"`
	Rating       int    `json:"rating"`
	CourseImage  string `json:"course_image"`
	Category     string `json:"category"`
	Capacity     int    `json:"capacity"`
}
