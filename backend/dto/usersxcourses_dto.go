package dto

type InscriptionRequest struct {
	ID    int
	Token string
}

type InscriptionResponse struct {
	Message string
}
