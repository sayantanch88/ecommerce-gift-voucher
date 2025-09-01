# Task Manager (Java 21 + Spring Boot)

Simple **Task Management API** for experimenting with AI tools across the SDLC.

## Tech
- Java 21, Spring Boot 3.3
- Spring Web, Spring Data JPA, H2, Bean Validation
- Maven

## Run
```bash
mvn spring-boot:run
# or
mvn clean package && java -jar target/task-manager-0.0.1-SNAPSHOT.jar
```

## REST Endpoints

- `POST /tasks` – Create task
- `GET /tasks` – List all tasks
- `GET /tasks/{id}` – Get one
- `PUT /tasks/{id}` – Update
- `DELETE /tasks/{id}` – Delete
- `GET /tasks/status/{status}` – Filter by status (PENDING|IN_PROGRESS|COMPLETED)
- `GET /tasks/priority/{priority}` – Filter by priority (LOW|MEDIUM|HIGH)

### Sample JSON
```json
{
  "title": "Write docs",
  "description": "Draft README",
  "dueDate": "2025-09-30",
  "priority": "HIGH",
  "status": "PENDING"
}
```

## H2 Console
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:taskdb`
- Username: `sa` (no password)
