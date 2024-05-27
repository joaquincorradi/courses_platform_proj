package courses

import (
	"errors"
	"strings"
)

func CreateCourse(title string, description string, requirements string, rating string, courseImage string, category string) error {
	if strings.TrimSpace(title) == "" {
		return errors.New("title is required")
	}

	if strings.TrimSpace(description) == "" {
		return errors.New("description is required")
	}

	if strings.TrimSpace(requirements) == "" {
		return errors.New("requirements is required")
	}

	if strings.TrimSpace(rating) == "" {
		return errors.New("rating is required")
	}

	if strings.TrimSpace(courseImage) == "" {
		return errors.New("courseImage is required")
	}

	if strings.TrimSpace(category) == "" {
		return errors.New("category is required")
	}

}
