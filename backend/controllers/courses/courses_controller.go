package courses

import (
	coursesDTO "backend/dto"
	coursesService "backend/services/courses"
	utils "backend/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func CreateCourse(c *gin.Context) {
	var request coursesDTO.CreateCourseRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})

		return
	}

	isadmin, err := utils.ValidateUserRole(request.Token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized login: ": err.Error(),
		})
		return
	}

	if isadmin {
		err := coursesService.CreateCourse(request)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"Unauthorized request: ": err.Error(),
			})

			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"Mensaje": "Se creó el curso correctamente",
		})
	} else {
		c.JSON(http.StatusCreated, gin.H{
			"Mensaje": "Error. No eres administrador",
		})
	}

}

func GetCourses(c *gin.Context) {
	courseDTOs, err := coursesService.GetCourses()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err,
		})

		return
	}

	c.JSON(http.StatusOK, coursesDTO.GetCoursesResponse{
		Courses: courseDTOs,
	})
}

func SearchCourse(c *gin.Context) {
	query := strings.TrimSpace(c.Query("q"))

	courses_filter, err := coursesService.Search(query)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Hola",
		})

		return
	}

	c.JSON(http.StatusOK, coursesDTO.SearchResponse{
		Courses_Filter: courses_filter,
	})
}

func DeleteCourse(c *gin.Context) {
	var request coursesDTO.DeleteCourseRequest

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"Invalid request: ": err.Error(),
		})
		return
	}

	isadmin, err := utils.ValidateUserRole(request.Token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Unauthorized login: ": err.Error(),
		})
		return
	}
	/*
		if isadmin { // = true

			err := coursesService.DeleteCourse(request.ID)
			if err != nil {
				c.JSON(http.StatusUnauthorized, gin.H{
					"Unauthorized login: ": err.Error(),
				})
				return
			}

		} else {
			c.JSON(http.StatusUnauthorized, gin.H{
				"Not ADMIN: ": "No es un administrador",
			})
			return
		}
	*/
	if !isadmin {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Error: ": "No es un administrador",
		})

		return
	}

	err1 := coursesService.DeleteCourse(request.ID)

	if err1 != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"Error in DB: ": err1.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, coursesDTO.DeleteCourseResponse{
		Message: "Se borró correctamente",
	})
}

func ShowCourse(c *gin.Context) {
	id := c.Param("id")

	course, err := coursesService.ShowCourse(id)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, coursesDTO.ShowCourseResponse{
		Course: course,
	})
}
