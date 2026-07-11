# Testing

> Mapped: 2026-07-12

## Current Setup

Although Jest is listed as a dependency and standard testing scripts are configured in `csnmahanagarpalika/package.json`, **there are currently no custom test suites implemented in the codebase.**

The following testing configurations exist:
- **Test Runner:** Jest (`jest`, `jest-environment-jsdom`) is configured in the environment.
- **Testing Libraries:** `@testing-library/react` and `@testing-library/jest-dom` are loaded in `devDependencies` for UI component testing.

---

## Centralized Scripts (`package.json`)

The following test scripts are exposed:

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run test` | `jest` | Run all test cases in the codebase |
| `npm run test:watch` | `jest --watch` | Start Jest in interactive watch mode for local development |
| `npm run test:coverage` | `jest --coverage` | Execute tests and output code coverage reports |

---

## Testing Recommendations & Guidelines

When implementing new tests in future phases, adhere to these guidelines:

### 1. Component Tests
- Place tests inside folders named `__tests__` adjacent to the components being tested.
- Test files should name-match the target component: `MyComponent.test.tsx`.
- Focus testing on user interactions (clicks, input entry), state updates, and accessible rendering.
- Mock external dependencies such as the Firebase Web SDK (`src/lib/firebase/`) using Jest mocks.

### 2. Service & Lib Tests
- Test utility libraries (such as validation logic or formatting helpers) using unit tests.
- Mock all network requests and DB collections using mock data representing Firestore documents.

### 3. Integration & E2E Tests
- Leverage the Firebase Local Emulator Suite (defined on ports `9099`, `8080`, `9199`, etc.) to run integration tests against local database and auth states.
- Run `firebase emulators:start` before initiating integration test scripts.
