# Proyecto Final - Arquitectura de Software I
[![Seguir](https://img.shields.io/badge/joaquincorradi-%238B5CF6.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/joaquincorradi/) [![Seguir](https://img.shields.io/badge/sanrearte-%238B5CF6.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sanrearte/) [![Seguir](https://img.shields.io/badge/IgnaAltamirano00-%238B5CF6.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/IgnaAltamirano00/)

## _Introducción_
Como práctico integrador se solicita la creación de un sistema de gestión de cursos en línea (LMS), donde se destacan dos componentes a ser desarrollados.
- El backend, desarrollado en Golang, brindará todas las interfaces necesarias para dar solución al requerimiento.
- El frontend, desarrollado en React, representa la vista final del usuario y consumirá los servicios desarrollados en el backend.
Para la construcción del sistema de gestión de cursos se solicitan los siguientes puntos.

## _Backend_
- **Autenticación de usuarios**: Implementar un sistema de login y gestión de permisos de usuarios. Deben existir 2 tipos de usuarios: alumno y administrador.
- **Gestión de cursos**: Desarrollar endpoints que permitan la creación, edición, y eliminación de cursos por parte de los administradores.
- **Gestión de usuarios inscritos**: Implementar un endpoint para listar los cursos a los que un usuario está inscrito.
- **Seguridad**: Garantizar la seguridad de las transacciones (autorización por token firmado entre frontend y backend) y datos (hashing de contraseñas) del sistema.

## _Frontend_
- **Pantalla de inicio (Home)**: Mostrar un listado de cursos disponibles para inscripción.
- **Búsqueda de cursos**: Implementar un motor de búsqueda que permita a los usuarios encontrar cursos por palabras clave o categorías.
- **Detalle del curso**: Mostrar información detallada sobre un curso seleccionado, incluyendo descripción, instructor, duración, y requisitos.
- **Inscripción en curso**: Habilitar un botón de inscripción para que los usuarios puedan registrarse en los cursos de su interés.
- **Mis cursos**: Mostrar un listado de los cursos a los que el usuario está inscrito, con la opción de acceder a los detalles de cada curso.
