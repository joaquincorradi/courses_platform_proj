package models

import "time"

type User_Course struct {
	UserID   int       `gorm:"primaryKey"`
	CourseID int       `gorm:"primaryKey"`
	Date     time.Time // time.Time es un date
}

type Feedback struct {
	UserID   int    `gorm:"primaryKey"`
	CourseID int    `gorm:"primaryKey"`
	Comment  string `gorm:"type:varchar(1000)"`
	Rating   int
}
