package users

import (
	"backend/database"
	"backend/initializers"
	"time"

	// usersDomain "backend/model/users"
	// UsersService "backend/services/users"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	var body struct {
		Email    *string
		Password string
	}

	if c.Bind(&body) != nil { // ver que es el body. Body estruct json
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ERROR bind body",
		})

		return
	}

	hash_password, err := bcrypt.GenerateFromPassword([]byte(body.Password), 5) // cambiar a 10 depsues

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ERROR hash pass",
		})

		return
	}

	user := database.User{
		Name:     "Ignacio",
		Lastname: "Altamirano",
		Email:    body.Email,
		Password: string(hash_password),
		Role:     "admin",
	}

	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ERROR create user",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func Login(c *gin.Context) {
	var body struct {
		Email    *string
		Password string
	}

	if c.Bind(&body) != nil { // ver que es el body. Body estruct json
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ERROR bind body",
		})

		return
	}

	// buscamos los datos donde el emial mandado del request es igual al email de la database
	var user database.User
	original_password := body.Password // VALOR EN * TEXTO * DE LA PASSWORD
	initializers.DB.First(&user, "email = ?", body.Email)

	// comparar original_password con hashed_password
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(original_password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Su contrasenia no es correcta",
		})

		return
	}

	// Tenemos la contrasenia autenticada y ahora generamos el token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// Sign and get the complete token as a string
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "ERROR token to stringtoken",
		})
		return
	}

	// send it back
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600*24*30, "", "", false, true)

	c.JSON(http.StatusCreated, gin.H{})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}
