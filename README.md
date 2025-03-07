# Universidad Escuela Colombiana de Ingeniería Julio Garavito

## Arquitectura Empresarial - Patrones arquitecturales

### Autor: Joan Acevedo

---
Create a CRUD System to Manage Properties

### Objective:

Students are tasked with developing a simple CRUD (Create, Read, Update, Delete) system for managing real estate properties. The goal is to build a basic web application that allows users to perform the following operations on property listings:

- Create new property listings.
- Read or view a list of all properties and individual property details.
- Update existing property details.
- Delete property listings.
      
### Requirements:

1.	Frontend (HTML + JavaScript):
      -	Create a simple user interface with forms to capture property information (e.g., address, price, size, description).
      -	Display a list of all properties with options to view, update, and delete each one.
      -	Implement client-side validation (e.g., required fields, valid data types).
      -	Use AJAX or Fetch API to communicate with the backend REST services.

---
      
Para este proyecto se creo desde cero una aplicación web, para agilizar el trabajo usamos la herramienta `https://start.spring.io`, donde configuramos la siguiente información:

![Image](https://github.com/user-attachments/assets/3ec776fa-6f4e-4bba-a656-e78cdcaaa88e)

Siguiendo lo indicado por el enunciado creamos una estructura muy basica del Front-End, para ello creamos la siguiente estructura base de archivos con su respectivo código:

![Image](https://github.com/user-attachments/assets/d06daab5-a7eb-463a-af10-d83c4e6a5797)

Finalmente comprobamos que hasta ahora todo este funcionando correctamente buscando en nuestro browser `http://localhost:8080`, donde obtenemos lo siguiente:

![Image](https://github.com/user-attachments/assets/194be1b8-857e-4359-b619-83116ae42f0a)

---

2.	Backend (Spring Boot REST API):
      -	Develop RESTful endpoints for each CRUD operation:
        - POST to create a new property.
        - GET to retrieve all properties or a single property by ID.
        - PUT to update an existing property.
        - DELETE to remove a property by ID.
      -	Handle errors such as invalid inputs or requests for non-existent properties.
      -	Ensure that each property has the following attributes:
        - Property ID (generated automatically)
        - Address
        - Price
        - Size
        - Description
      
---

Para esta nueva sección del Back-End, procedi a crear las clases:

- `PropertyController` la cual se encarga de exponer los endpoints REST.
- `Property` la cual representará una propiedad inmobiliaria en la base de datos.
- `PropertyRepository` `(Interfaz)` la cual maneja la comunicación con la base de datos.
- `PropertyService` la cual manejará la lógica de negocio.

Las cuales se distribuyeron en la siguiente estructura de base de archivos:

![Image](https://github.com/user-attachments/assets/c54305f5-8f5f-47a6-954f-617be7dcc0fe)

Podemos destacar que en la clase `PropertyController` encontramos el mapeo de las operaciones CRUD.

```java
    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyById(@PathVariable Long id) {
        Optional<Property> property = propertyService.getPropertyById(id);
        return property.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property updatedProperty) {
        try {
            Property property = propertyService.updateProperty(id, updatedProperty);
            return ResponseEntity.ok(property);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
```

También podemos destacar la clase `Property` que es donde tenemos los atributos necesarios y la generación automatica del ID.

```java
    //Generación automatica del ID
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
```

Ahora procedemos a ver si funciona, para esto volvemos a acceder a `http://localjost:8080` e ingresamos unos datos de prueba:

![Image](https://github.com/user-attachments/assets/8e4bdea5-444c-4ba0-9eda-123b74b4c062)

Al dar click en el botón `Guardar` vemos que la clase `PropertyController` cumple con las funciones de `Create` y `Read`:

![Image](https://github.com/user-attachments/assets/624009d2-b2ce-4f73-9cf5-dc601859c883)

Ahora, al dar click en el botón `Editar` vemos que nos permite acutalizar los datos, en este caso cambiamos el tamaño de `20` a `35`:

![Image](https://github.com/user-attachments/assets/a1d7ea82-ad58-40a0-b8f5-54237ed859f0)

Al dar click en el botón `Guardar` vemos que efectivamente se cumple con la función de `Update`, actualizando los datos de forma correcta:

![Image](https://github.com/user-attachments/assets/375caf97-ab65-49d1-a995-3ee3c57749e4)

Ahora, al dar click en el botón `Eliminar` vemos que que nos sale una ventana emergente para confirmar el eliminación de los datos:

![Image](https://github.com/user-attachments/assets/58421266-f044-41bc-9410-f40869bf0493)

Y al dar click en el botón `Ok`  vemos que efectivamente se cumple con la función de `Delete`:

![Image](https://github.com/user-attachments/assets/194be1b8-857e-4359-b619-83116ae42f0a)

**NOTA: Recordemos que en esta parte todavia no ejecutamos nada con la base de datos**

---

3.	Database (MySQL):
      -	Create a properties table with columns for ID, address, price, size, and description.
      -	Use JPA/Hibernate to map the property objects to the database.
      -	Implement data persistence for all CRUD operations.

---

Procedemos a crear la base de datos con Docker, para ello nos dirigimos a la terminal de nuestro computador y nos ubicamos en la dirección del proyecto e ingresamos el siguiente comando:

      docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=admin123 -e MYSQL_DATABASE=web_application -p 3306:3306 -d mysql:8

Podemos obser como se va creando la imagen de la base de datos, y si queremos confirmar su creación, podemos ingresar el comando `docker ps`:

![Image](https://github.com/user-attachments/assets/5feaf599-2905-4b2a-adfe-b87c48299459)

Ya con la base de datos creada, procedemos a modificar nuestro archivo `application.properties` para que pueda realizar el mapeo con la base de datos, para ello, agregamos el siguiente código:

```text
spring.application.name=WebAplication
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/localsql?createDatabaseIfNotExist=true
spring.datasource.username=admin
spring.datasource.password=admin
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.show-sql=true
```

También debemos agregar la dependencia de MySQL al pom:

```text
  <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.33</version>
  </dependency>
```

Finalmente ejecutamos los comandos `mvn clean install` seguido de `mvn spring-boot:run` y vemos que se ejecuta con exito:

![Image](https://github.com/user-attachments/assets/6efc2160-9fb1-4fe3-9449-886c0239f8ed)

---

### Arquitectura

Para este trabajo la arquitectura que se decidió manejar de la siguiente manera:

Tenemos una máquina virtual que se conecta a una base de datos relacional en una red privada para que no se filtre información. Adémas, el usuario consulta los servicios a través de una página web la cual está alojada en un servidor de aplicaciones en la nube.

![Image](https://github.com/user-attachments/assets/ec385b03-b4bb-4c45-8459-6216cb17d0d6)

---

### Diagrama de clases

![Image](https://github.com/user-attachments/assets/d6d0d520-a694-419d-98c1-82dffa74385f)
