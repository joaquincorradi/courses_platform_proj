// Verificamos autorizacion de logeo. fecha, etc...

package middleware

import (
	"backend/database"
	"backend/initializers"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequiereAuth(c *gin.Context) {
	// Obtenemos la cookie de la request
	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Validamos
	// Parse takes the token string and a function for looking up the key. The latter is especially
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		// Chequeamos la expiracion (date). Se paso la fecha propuesta. 30 dias
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// Encontramos al usuario con token sub
		var user database.User
		initializers.DB.First(&user, claims["sub"])

		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// Lo agregamos con la request
		c.Set("user", user)

		// Continuar
		c.Next()
	} else { // ERROR
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}
}
