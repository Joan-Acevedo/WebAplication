Joan Acevedo

---
Create a CRUD System to Manage Properties

Objective:

Students are tasked with developing a simple CRUD (Create, Read, Update, Delete) system for managing real estate properties. The goal is to build a basic web application that allows users to perform the following operations on property listings:

- Create new property listings.
- Read or view a list of all properties and individual property details.
- Update existing property details.
- Delete property listings.
      Requirements:
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
3.	Database (MySQL):
      •	Create a properties table with columns for ID, address, price, size, and description.
      •	Use JPA/Hibernate to map the property objects to the database.
      •	Implement data persistence for all CRUD operations.
4.	The backend services and the database should be deployed in separate servers in AWS.
      
Optional Enhancements (for extra credit):

1.	Add pagination to the property listing.
2.	Implement search functionality to filter properties by location, price, or size.
3.	Provide user feedback on successful or failed operations (e.g., success messages, error notifications).
      
Deliverables:

1.	A working CRUD system that allows users to manage property listings deployed on AWS
2.	Code in a GitHub Repository:
      -	All project code should be organized and uploaded to a GitHub repository.
      -	The repository should follow best practices with clear folder structures for frontend, backend, and database configuration.
3.	README File:
      -	Include a README.md with:
        - Project Summary: A brief explanation of the system and its main functionality (property management).
        - System Architecture: Description of the frontend, backend, and database, and how they interact.
        - Class Design: Overview of the main classes with diagrams if possible (e.g., Property, PropertyService, PropertyController).
        - Deployment Instructions: Steps for generating and deploying images , from setup to running the services in AWS
        - Screenshots: Images showing the system in action, including CRUD operations.
4.	Deployment Video:
      -	A short video demonstrating the system running, including examples of create, read, update, and delete operations.
      -	The video should show how to deploy the system
