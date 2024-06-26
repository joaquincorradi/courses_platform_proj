package models

type Course struct {
	ID           int     `gorm:"primaryKey"`
	Title        string  `gorm:"type:varchar(200)"`
	Description  string  `gorm:"type:varchar(1000)"`
	Requirements string  `gorm:"type:varchar(1000)"`
	StartDate    string  `gorm:"type:varchar(1000)"`
	EndDate      string  `gorm:"type:varchar(1000)"`
	Rating       float64 `gorm:"type:decimal(2,1)"`
	CourseImage  string  `gorm:"type:varchar(1000)"`
	Category     string  `gorm:"type:varchar(1000)"`
	//DeletedAt    gorm.DeletedAt
	Users []User `gorm:"many2many:user_courses;"`
}
