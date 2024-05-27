package dto

type CreateCourseRequest struct {
	Title        string `json:"title"`
	Description  string `json:"description"`
	Requirements string `json:"requirements"`
	StartDate    string `json:"start_date"`
	EndDate      string `json:"end_date"`
	Rating       uint8  `json:"rating"`
	CourseImage  string `json:"course_image"`
	Category     string `json:"category"`
	Capacity     uint64 `json:"capacity"`
}

type CreateCourseResponse struct {
	Message string `json:"message"`
}
