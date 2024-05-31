package models

type Course struct {
	ID           int    `gorm:"primaryKey"`
	Title        string `gorm:"type:varchar(50)"`
	Description  string `gorm:"type:varchar(1000)"`
	Requirements string `gorm:"type:varchar(1000)"`
	StartDate    string `gorm:"type:varchar(1000)"`
	EndDate      string `gorm:"type:varchar(1000)"`
	Rating       int    `gorm:"type:int"`
	CourseImage  string `gorm:"type:varchar(1000)"`
	Category     string `gorm:"type:varchar(1000)"`
	Capacity     int    `gorm:"type:int"`
	Users        []User `gorm:"many2many:user_courses;"`
}
