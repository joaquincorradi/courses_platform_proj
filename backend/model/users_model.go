package model

// Domain Classes - "User" entity
type User struct {
	ID       uint    `gorm:"primaryKey"`        // Standard field for the primary key
	Name     string  `gorm:"type:varchar(300)"` // A regular string field
	Lastname string  `gorm:"type:varchar(300)"` // A regular string field
	Email    *string `gorm:"unique"`            // A pointer to a string, allowing for null values
	Password string  `gorm:"unique"`
	Role     string  `gorm:"type:varchar(300)"`
}
