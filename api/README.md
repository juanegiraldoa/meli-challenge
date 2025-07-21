# Ejecucion del proyecto

## Requisitos Previos 

- Docker instalado

## Ejecucion

1. desde el directorio razis del proyecto `api` ejecuta el comando
    ```bash
   docker build -t meli-challenge:latest .
    ```
2. Una vez finaliza la creacion de la imagen ejecutar el comando
    ```bash
   docker run -d -p 8080:8080 --name meli-challenge meli-challenge:latest
   ```
---

# Ejecucion en desarrollo

## Requisitos Previos

- Java 21 o superior
- Coneccion a una base de datos posgres **(local o remoto)**

## Ejecucion:

1. Abir el pryecto en el IDE de preferencia (Recomentado IntelliJ)
2. Configurar variables de entorno
    ```
       DB_URL=jdbc:postgresql://{URL}:5432/{DATABASE}
       DB_USER={USERNAME}
       DB_PASS={PASSWORD}
    ```
    o modificar el archivo `application.yml` con la informacion de la coneccion
    ```yml
    datasource:
        url: jdbc:postgresql://{URL}:5432/{DATABASE}
        username: {USERNAME}
        password: {PASSWORD}
    ```
3. Ejecutar la funcion `main` dentro de la clase `Application`