---
applyTo: src/**
---

# Copilot Custom Instructions for Backend (PHP)

These instructions apply to all code and contributions within the `src/` folder of this repository.

## Project Type
- PHP backend organized by Controllers, Models, and Services.
- Follows PSR-4 autoloading as defined in `composer.json`.

## Coding Standards
- Follow PSR-12 coding standard for all PHP code.
- Use namespaces and autoloading for all classes.
- Place business logic in Services, data structures in Models, and request handling in Controllers.
- Use type hints and strict types where possible.
- Write clear, maintainable, and well-documented code.
- Use meaningful variable and function names.
- Add docblocks for all public classes and methods.

## Linting & Formatting
- Use `phpcs` for linting and code style checks.
- Fix all lint errors and warnings before committing code.
- Add or update `phpcs.xml` in the root as needed.

## File & Folder Structure
- Controllers: Handle HTTP requests and responses.
- Models: Represent data structures and entities.
- Services: Contain business logic and integrations (e.g., BigCommerce API).
- Integration logic for BigCommerce is in `src/bigcommerce_integration.php`.

## Documentation
- Document all public classes and methods with PHPDoc comments.
- Update relevant documentation in the `docs/` folder for major changes.

## Testing
- Add unit and integration tests for new features and bug fixes.
- Place tests in the `tests/` folder, organized by feature or module.
- Ensure all tests pass before submitting code for review.

## Security
- Do not commit sensitive information or credentials.
- Sanitize and validate all user inputs.
- Use environment variables for API credentials and sensitive data.

---

*Update this file as standards and processes evolve for the backend PHP code.*
