package models

import "time"

type User_Course struct {
	UserID   int `gorm:"primaryKey"`
	CourseID int `gorm:"primaryKey"`
	Date     time.Time
}
