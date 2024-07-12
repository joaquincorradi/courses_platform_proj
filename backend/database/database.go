package database

import (
	"backend/models"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	dsn_s := os.Getenv("DB_S")
	// dsn_i := os.Getenv("DB_I")
	// dsn_j := os.Getenv("DB_J")
	db, err := gorm.Open(mysql.Open(dsn_s), &gorm.Config{})
	// db, err := gorm.Open(mysql.Open(dsn_i), &gorm.Config{})
	// db, err := gorm.Open(mysql.Open(dsn_j), &gorm.Config{})

	if err != nil {
		panic("Failed to connect to DB")
	}

	DB = db

	DB.AutoMigrate(
		&models.Course{},
		&models.User{},
		&models.User_Course{},
		&models.Feedback{},
	)
}
