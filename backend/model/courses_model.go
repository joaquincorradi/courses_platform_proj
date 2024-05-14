package model

import "time"

type Courses struct {
	ID          uint   `gorm:"primaryKey"`
	Title       string `gorm:"type:varchar(50)"`
	Description string `gorm:"type:varchar(1000)"`
	Duration    *time.Time
	Rating      uint8 `gorm:"type:int"`
	Capacity    uint8 `gorm:"type:int"`
}
