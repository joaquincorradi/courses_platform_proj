package dto

type InscriptionRequest struct {
	ID    int    `json:"id"`
	Token string `json:"token"`
}

type InscriptionResponse struct {
	Message string `json:"message"`
}

type GetUserCoursesRequest struct {
	Token string `json:"token"`
}

type GetUserCoursesResponse struct {
	Courses []Course `json:"courses"`
}
