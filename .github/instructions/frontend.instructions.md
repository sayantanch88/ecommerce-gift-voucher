---
applyTo: frontend/**
---

# Copilot Custom Instructions for Frontend (React + Vite)

These instructions apply to all code and contributions within the `frontend/` folder of this repository.

## Project Overview
- **Framework:** React 18 with functional components and hooks
- **Build Tool:** Vite for fast development and optimized production builds
- **Testing:** Jest for unit tests, Playwright for E2E testing
- **Styling:** CSS modules or styled-components (prefer component-scoped styles)
- **State Management:** React built-in state (Context API for global state if needed)

## Project Structure Standards
```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductList.jsx
│   │   ├── VoucherModal.jsx
│   │   └── __tests__/       # Component unit tests
│   ├── pages/               # Page-level components (if routing added)
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions and helpers
│   ├── services/            # API service functions
│   ├── constants/           # Application constants
│   ├── styles/              # Global styles and theme
│   ├── App.jsx              # Root component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── e2e/                     # Playwright E2E tests
├── package.json
├── vite.config.js
└── playwright.config.js
```

## Coding Standards & Best Practices
### React Component Standards
- **Functional Components:** Always use functional components with hooks
- **Component Naming:** PascalCase for components, camelCase for functions/variables
- **Props Validation:** Use PropTypes for runtime type checking
- **Component Size:** Keep components under 200 lines; split into smaller components if larger
- **Single Responsibility:** Each component should have one clear purpose
- **Composition:** Prefer composition over inheritance for component reuse

### Modern React Patterns
```jsx
// ✅ Good: Functional component with hooks
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onAddToCart }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await onAddToCart(product.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button 
        onClick={handleAddToCart} 
        disabled={isLoading}
        aria-label={`Add ${product.name} to cart`}
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired
};

export default ProductCard;
```

### State Management Guidelines
- **Local State:** Use `useState` for component-specific state
- **Effect Hooks:** Use `useEffect` for side effects, cleanup properly
- **Custom Hooks:** Extract reusable logic into custom hooks
- **Global State:** Use Context API sparingly, prefer prop drilling for simple apps
- **State Immutability:** Always create new state objects instead of mutating

### Performance Optimization
- **Lazy Loading:** Use `React.lazy()` for route-based code splitting
- **Memoization:** Use `React.memo()`, `useMemo()`, `useCallback()` judiciously
- **Bundle Optimization:** Analyze bundle size with `npm run build`
- **Image Optimization:** Use WebP format, proper sizing, lazy loading
- **Virtual Scrolling:** For large lists (100+ items)

## Testing Standards
### Unit Testing with Jest
- **Test Location:** Place tests in `__tests__` folders or `.test.jsx` files
- **Test Structure:** Arrange-Act-Assert pattern
- **Testing Library:** Use `@testing-library/react` for component testing
- **Coverage:** Aim for 80%+ test coverage on new components
- **Mock Strategy:** Mock external dependencies and API calls

```jsx
// ✅ Good: Comprehensive component test
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from '../ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 99.99
};

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    const mockOnAddToCart = jest.fn();
    
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add test product to cart/i })).toBeInTheDocument();
  });

  it('should call onAddToCart when button is clicked', async () => {
    const mockOnAddToCart = jest.fn().mockResolvedValue();
    
    render(<ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />);
    
    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(mockOnAddToCart).toHaveBeenCalledWith('1');
    });
  });
});
```

### E2E Testing with Playwright
- **Test Organization:** Group tests by user journey or feature
- **Page Object Model:** Use page objects for complex interactions
- **Test Data:** Use fixtures for consistent test data
- **Test Isolation:** Each test should be independent and clean up after itself
- **Cross-Browser:** Test on Chrome, Firefox, Safari (mobile)

## Accessibility (a11y) Standards
### Required Accessibility Features
- **Semantic HTML:** Use proper HTML5 semantic elements
- **ARIA Labels:** Add `aria-label`, `aria-describedby` for screen readers
- **Keyboard Navigation:** All interactive elements accessible via keyboard
- **Focus Management:** Visible focus indicators and logical tab order
- **Color Contrast:** Meet WCAG 2.1 AA contrast requirements (4.5:1)
- **Alt Text:** Descriptive alt text for all images

### Accessibility Testing
```jsx
// ✅ Good: Accessible component
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      // Trap focus within modal
      const focusableElements = modal.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusableElements[0]?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <h2 id="modal-title">{title}</h2>
        <button 
          onClick={onClose}
          aria-label="Close modal"
          className="modal-close"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
```

## Code Quality & Tooling
### Linting & Formatting
- **ESLint:** Use `@vitejs/plugin-react` recommended config
- **Prettier:** Consistent code formatting across the project
- **Pre-commit Hooks:** Run linting and formatting on commit
- **VS Code:** Install ESLint and Prettier extensions

### Import Organization
```jsx
// ✅ Good: Import order
// 1. React and React-related
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import PropTypes from 'prop-types';
import axios from 'axios';

// 3. Internal utilities and services
import { formatPrice } from '../utils/currency';
import { productService } from '../services/api';

// 4. Components
import Button from './Button';
import Modal from './Modal';

// 5. Styles (at the end)
import './ProductCard.css';
```

## API Integration Standards
### Service Layer Pattern
```jsx
// services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const productService = {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async addToCart(productId) {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return response.json();
  }
};
```

### Error Handling
- **User-Friendly Messages:** Show helpful error messages to users
- **Error Boundaries:** Implement React Error Boundaries for graceful failures
- **Retry Logic:** Implement retry for failed API calls
- **Loading States:** Always show loading indicators for async operations

## Security Standards
### Input Validation & Sanitization
- **Client-Side Validation:** Always validate form inputs
- **XSS Prevention:** Sanitize user-generated content
- **CSRF Protection:** Include CSRF tokens in API requests
- **Content Security Policy:** Implement CSP headers

### Environment Configuration
```javascript
// ✅ Good: Environment variable usage
const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  environment: import.meta.env.MODE
};

// ❌ Bad: Never commit secrets
// const apiKey = 'sk-1234567890abcdef'; // DON'T DO THIS
```

## Build & Deployment
### Vite Configuration
- **Environment Variables:** Use `VITE_` prefix for client-side variables
- **Build Optimization:** Configure bundle splitting and tree shaking
- **Asset Optimization:** Optimize images, fonts, and other static assets
- **Source Maps:** Generate source maps for debugging

### Performance Monitoring
- **Web Vitals:** Monitor Core Web Vitals (CLS, FID, LCP)
- **Bundle Analysis:** Regular bundle size analysis
- **Lighthouse Audits:** Regular performance and accessibility audits

---

*This file should be updated as frontend standards and React best practices evolve.*
