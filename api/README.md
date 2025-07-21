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
   docker run -d -p 8080:8080 \
   --name meli-challenge \
   -e DB_URL={URL} \
   -e DB_USER={USERNAME} \
   -e DB_PASS={PASSWORD} \
   meli-challenge:latest
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

---

# Endpoints expuestos

Base URL: `http://127.0.0.1:8080/`

---

### 1. Crear un nuevo seller
**`POST /seller`**  
Crea nuevo seller.

**Request body example:**
```json
{
  "title": "Title One",
  "site": "http://localhost:8080",
  "nickname": "Juan",
  "price": 100,
  "currency": "COP"
}
```

---

### 2. Actualizar seller
**`PUT /seller`**  
Actualiza seller.

**Request body example:**
```json
{
  "id": "f852cea7-920d-4e5f-a0d2-7443cb66e534",
  "title": "Title One",
  "site": "http://localhost:8080",
  "nickname": "Juan",
  "price": 100,
  "currency": "COP"
}
```

---

### 3. Consultar sellers
**`GET /seller`**  
Consulta todos los sellers.

---
