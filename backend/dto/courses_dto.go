package dto

type CreateCourseRequest struct {
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	Category string  `json:"category"`
}

type CreateCourseResponse struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}
