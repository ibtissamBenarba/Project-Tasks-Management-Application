# Project Task Manager

A web application to manage projects and tasks.  
Built with **Java (Spring Boot)** for the backend, **React** for the frontend, and **MySQL** as the database.

---

## Tools Used

- **Backend:** Java, Spring Boot, Spring Data JPA, Spring Security
- **Frontend:** React, React Router, Axios, Bootstrap
- **Database:** MySQL

---

## Database Setup

1. Install MySQL if not already installed.
2. Create a database for the project:

```sql
CREATE DATABASE project_task_manager;
```
3. Update your backend configuration (application.properties) with your database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/project_task_manager
spring.datasource.username=user
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
```

## How to Run Backend

1. Open a terminal and navigate to the backend folder:
```bash
cd backend
```
2. Build and run the backend using Maven:
```bash
./mvnw spring-boot:run
```
3. The backend will be available at: http://localhost:8080

## Default User
The application comes with a default user for testing purposes, initialized automatically when the backend starts:

**Email**: test@mail.com

**Password**: 123456

You can use this account to log in immediately after setting up the backend.

## How to Run Frontend
1. Open a terminal and navigate to the frontend folder:
```bash
cd project-tasks-frontend
```
2. Install all dependencies:
```bash
npm install
```
3. Install all dependencies:
```bash
npm install axios react-router-dom bootstrap
```
4. Start the frontend:
```bash
npm run dev
```
5. The frontend will be available at http://localhost:5173
