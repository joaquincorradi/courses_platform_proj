package models

import "time"

type User_Course struct {
	UserID   uint      `gorm:"primaryKey"`
	CourseID uint      `gorm:"primaryKey"`
	Date     time.Time // time.Time es un date
}
