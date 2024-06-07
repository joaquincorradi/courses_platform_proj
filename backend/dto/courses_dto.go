package dto

type CreateCourseRequest struct {
	Token        string  `json:"token"`
	Title        string  `json:"title"`
	Description  string  `json:"description"`
	Requirements string  `json:"requirements"`
	StartDate    string  `json:"start_date"`
	EndDate      string  `json:"end_date"`
	Rating       float64 `json:"rating"`
	CourseImage  string  `json:"course_image"`
	Category     string  `json:"category"`
}

type CreateCourseResponse struct {
	Message string `json:"message"`
}

type Course struct {
	ID           int     `json:"id"`
	Title        string  `json:"title"`
	Description  string  `json:"description"`
	Requirements string  `json:"requirements"`
	StartDate    string  `json:"start_date"`
	EndDate      string  `json:"end_date"`
	Rating       float64 `json:"rating"`
	CourseImage  string  `json:"course_image"`
	Category     string  `json:"category"`
}

type GetCourseResponse struct {
	Courses []Course `json:"courses"`
}

type SearchResponse struct {
	Courses_Filter []Course `json:"courses"`
	// State        bool    `json:"state"`
}

type DeleteCourseRequest struct {
	Token string `json:"token"`
	ID    int    `json:"id"`
}

type DeleteCourseResponse struct {
	Message string `json:"message"`
}

type ShowCourseResponse struct {
	Course Course `json:"course"`
}
