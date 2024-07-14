package users_courses

import (
	usersCoursesDTO "backend/dto"
	usersCoursesService "backend/services/users_courses"
	"net/http"

	"github.com/gin-gonic/gin"
)

func InscriptionUserCourse(c *gin.Context) {
	var request usersCoursesDTO.InscriptionRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	err := usersCoursesService.InscriptionUserCourse(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized sign-up: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, usersCoursesDTO.InscriptionResponse{
		Message: "User inscripted in course succesfully!",
	})

}

func GetUserCourses(c *gin.Context) {
	var request usersCoursesDTO.GetUserCoursesRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	courseDTOs, err := usersCoursesService.GetUserCourses(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized request: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, usersCoursesDTO.GetUserCoursesResponse{
		Courses: courseDTOs,
	})
}

func CreateComment(c *gin.Context) {
	var request usersCoursesDTO.CreateCommentRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	err := usersCoursesService.CreateComment(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized request: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, usersCoursesDTO.CreateCommentResponse{
		Message: "Comment created succesfully!",
	})
}

func GetAverageRating(c *gin.Context) {
	var request usersCoursesDTO.GetAverageRatingRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	averageRating, err := usersCoursesService.GetAverageRating(request)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized request: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, usersCoursesDTO.GetAverageRatingResponse{
		AverageRating: averageRating,
	})
}

func GetCourseAndComments(c *gin.Context) {
	id := c.Param("id")

	courseDTO, commentDTO, err := usersCoursesService.GetCourseAndComments(id)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized request: ": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, usersCoursesDTO.GetCourseAndCommentsResponse{
		Course:   courseDTO,
		Comments: commentDTO,
	})
}
