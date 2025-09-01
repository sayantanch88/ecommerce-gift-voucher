CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(2000),
    due_date DATE NOT NULL,
    priority VARCHAR(10) NOT NULL,
    status VARCHAR(15) NOT NULL
);

INSERT INTO tasks (title, description, due_date, priority, status) VALUES
('Write docs', 'Draft README for project', DATEADD('DAY', 7, CURRENT_DATE), 'HIGH', 'PENDING'),
('Create tests', 'Add unit tests for controller', DATEADD('DAY', 3, CURRENT_DATE), 'MEDIUM', 'IN_PROGRESS'),
('Refactor service', 'Improve service layer', DATEADD('DAY', 14, CURRENT_DATE), 'LOW', 'PENDING');
