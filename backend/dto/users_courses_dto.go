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

type GetAverageRatingRequest struct {
	CourseID int `json:"course_id"`
}

type GetAverageRatingResponse struct {
	AverageRating float64 `json:"average_rating"`
}

type GetCourseAndCommentsResponse struct {
	Course   Course     `json:"course"`
	Comments []Feedback `json:"comments"`
}

type Feedback struct {
	UserID   int    `json:"user_id"`
	UserName string `json:"user_name"`
	CourseID int    `json:"course_id"`
	Comment  string `json:"comment"`
	Rating   int    `json:"rating"`
}

type File struct {
	UserID   int    `json:"user_id"`
	UserName string `json:"user_name"`
	CourseID int    `json:"course_id"`
	FileName string `json:"file_name"`
}

type GetCourseAndCommentsAndFilesResponse struct {
	Course   Course     `json:"course"`
	Comments []Feedback `json:"comments"`
	Files    []File     `json:"files"`
}

type CreateFileRequest struct {
	Token    string `json:"token"`
	CourseID int    `json:"course_id"`
	FileName string `json:"file_name"`
}

type CreateFileResponse struct {
	Message string `json:"message"`
}
