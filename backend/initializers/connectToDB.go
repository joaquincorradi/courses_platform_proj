package initializers

import (
	"backend/model"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB *gorm.DB
)

func ConnectToDB() {
	dsn := os.Getenv("dsn")

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to open database")
	}

	DB = db

	DB.AutoMigrate(&model.User{})
	// We need to add all CLients that we build
}
