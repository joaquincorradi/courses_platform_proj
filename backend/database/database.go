package database

import "time"

type User struct {
	ID       uint    `gorm:"primaryKey"`        // Standard field for the primary key
	Name     string  `gorm:"type:varchar(300)"` // A regular string field
	Lastname string  `gorm:"type:varchar(300)"` // A regular string field
	Email    *string `gorm:"unique"`            // A pointer to a string, allowing for null values
	Password string  `gorm:"unique"`
	Role     string  `gorm:"type:varchar(300)"`
}

type Courses struct {
	ID          uint   `gorm:"primaryKey"`
	Title       string `gorm:"type:varchar(50)"`
	Description string `gorm:"type:varchar(1000)"`
	Duration    *time.Time
	Rating      uint8
}

type Enrollment struct {
	ID       uint
	Date     *time.Time
	USERID   uint
	USER     User
	COURSEID uint
	COURSE   Courses
}
