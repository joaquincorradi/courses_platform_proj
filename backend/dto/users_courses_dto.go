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

type CreateCommentRequest struct {
	Token    string `json:"token"`
	CourseID int    `json:"course_id"`
	Comment  string `json:"comment"`
	Rating   int    `json:"rating"`
}

type CreateCommentResponse struct {
	Message string `json:"message"`
}
