package model

import "time"

type User_Course struct {
	User    User `gorm:"foreignkey:UserId"`
	UserId  uint
	Course  Course `gorm:"foreignkey:CourseId"`
	CouseId uint
	Date    time.Time // time.Time es un date
}

type Users_Courses []User_Course
