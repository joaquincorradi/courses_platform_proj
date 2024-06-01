// Verificamos autorizacion de logeo. fecha, etc...

package utils

import (
	"backend/clients"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func ValidateUser(tokenString string) (jwt.MapClaims, error) {
	// recibo token -> request.Token

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
			return nil, errors.New("login Overtime")
		}
		// Encontramos al usuario con token id

		user, err := clients.SelectUserbyID(claims["sub"])
		if err != nil {
			return nil, errors.New("error searching in DB")
		}

		if user.ID == 0 {
			return nil, errors.New("user not found")
		}

		return claims, nil
	} else {
		return nil, errors.New("user not found")
	}
}

func ValidateUserRole(tokenString string) (bool, error) {
	// first we check he is Validated
	claims, err := ValidateUser(tokenString)
	if err != nil {
		return false, errors.New("user not validated")
	}

	role := claims["role"]

	if role == "admin" {
		return true, nil
	} else {
		return false, nil
	}
}

func GetIdByToken(tokenString string) (int, error) {

	claims, err := ValidateUser(tokenString)
	if err != nil {
		return 0, errors.New("user not validated")
	}

	id := claims["sub"].(int)
	if id == 0 {
		return 0, errors.New("user not found")
	}

	return id, nil
}

// func CheckStateCourse(id int) (bool, error) { // verificamos el state del curso

// 	// tengo id de curso. int.
// 	course, err := clients.SelectCourseById(id)
// 	if err != nil {
// 		return false, errors.New("user not validated")
// 	}

// 	if course.DeletedAt == nil {
// 		return true, nil
// 	} else {
// 		return false, nil
// 	}
// }
