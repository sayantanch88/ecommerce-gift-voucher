---
applyTo: frontend/**
---

# Copilot Custom Instructions for Frontend (React)

These instructions apply to all code and contributions within the `frontend/` folder of this repository.

## Project Type
- React application using Vite for build and development.
- Component-based structure with all main components in `src/components`.

## Coding Standards
- Use ES6+ syntax and React best practices.
- Prefer functional components and React hooks.
- Keep components small, focused, and reusable.
- Ensure accessibility (ARIA, keyboard navigation) and responsiveness in all UI components.
- Use PropTypes or TypeScript for type safety (if TypeScript is introduced).

## Linting & Formatting
- Use ESLint with Airbnb config for linting.
- Use Prettier for code formatting.
- Fix all lint and formatting errors before committing code.
- Add or update `.eslintrc.json` and `.prettierrc` in the `frontend/` folder as needed.

## File & Folder Structure
- Place all React components in `src/components`.
- Styles should be in `src/index.css` or component-specific CSS files.
- Entry point is `src/main.jsx` and root component is `src/App.jsx`.

## Documentation
- Document all public components and utility functions with JSDoc comments.
- Update relevant documentation in the `docs/` folder for major changes.

## Testing
- Add unit tests for components and utilities (recommend using Jest + React Testing Library).
- Place tests in a `__tests__` or `tests/` folder within `frontend/`.
- Ensure all tests pass before submitting code for review.

## Accessibility & UX
- All modals, buttons, and forms must be accessible and keyboard-navigable.
- UI should be responsive and work on desktop and mobile devices.

## Security
- Do not commit sensitive information or credentials.
- Sanitize and validate all user inputs in forms and modals.

---

*Update this file as standards and processes evolve for the frontend React app.*
