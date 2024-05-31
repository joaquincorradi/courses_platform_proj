package models

import "time"

type Course struct {
	ID           uint   `gorm:"primaryKey"`
	Title        string `gorm:"type:varchar(50)"`
	Description  string `gorm:"type:varchar(1000)"`
	Requirements string `gorm:"type:varchar(1000)"`
	StartDate    time.Time
	EndDate      time.Time
	Rating       uint8  `gorm:"type:int"`
	CourseImage  string `gorm:"type:varchar(1000)"`
	Capacity     uint64 `gorm:"type:int"`
	Users        []User `gorm:"many2many:user_courses;"`
}
