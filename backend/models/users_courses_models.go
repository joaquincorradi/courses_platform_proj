package models

type User_Course struct {
	UserID   int `gorm:"primaryKey"`
	CourseID int `gorm:"primaryKey"`
}

type Feedback struct {
	UserID   int    `gorm:"primaryKey"`
	CourseID int    `gorm:"primaryKey"`
	Comment  string `gorm:"type:varchar(1000)"`
	Rating   int
}

type File struct {
	ID       int `gorm:"primaryKey"`
	UserID   int
	CourseID int
	FileName string `gorm:"type:varchar(1000)"`
}
