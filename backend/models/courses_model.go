package models

import "time"

type Course struct {
	ID          uint   `gorm:"primaryKey"`
	Title       string `gorm:"type:varchar(50)"`
	Description string `gorm:"type:varchar(1000)"`
	FechaInicio time.Time
	Duracion    time.Duration
	Rating      uint8  `gorm:"type:int"`
	Users       []User `gorm:"many2many:user_courses;"`
}