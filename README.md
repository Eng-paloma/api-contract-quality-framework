# API Contract Quality Framework

A production-oriented API contract testing framework that validates REST endpoints using Playwright API testing and JSON Schema contracts. This framework demonstrates enterprise-grade quality engineering practices for API reliability and data validation.

## 🎯 Project Purpose

This framework serves as the **first line of defense** for API reliability by:
- Validating functional behavior and data contracts independently of UI automation
- Catching integration failures and contract drift early
- Reducing downstream risk in UI E2E test suites
- Maintaining a clean separation of concerns between API validation and user journey testing

## 🏗️ Architecture

```
api-contract-quality-framework/
├── playwright.config.js           # Central API test configuration (headless execution)
├── src/
│   ├── api/
│   │   ├── clients/              # Encapsulated API request clients
│   │   ├── schemas/              # JSON Schema definitions for contract validation
│   │   └── helpers/
│   │       └── schemaValidator.js # Reusable validation logic
│   └── tests/                     # Test suites (positive & negative scenarios)
└── package.json
```

### Key Components

| Component | Purpose |
|-----------|---------|
| **playwright.config.js** | Centralizes base URL, headers, retries, timeouts, and CI-friendly defaults |
| **api/clients/** | Encapsulated HTTP request clients with meaningful methods |
| **api/schemas/** | JSON Schema definitions for response contract validation |
| **schemaValidator.js** | Reusable helper that keeps test assertions DRY and readable |
| **tests/** | Intention-revealing tests organized by positive and negative coverage |

## ✅ Test Coverage

### Positive Scenarios
- ✓ Fetch all resources and validate collection contract
- ✓ Fetch single resource by ID and validate schema
- ✓ Create new resource and validate response contract
- ✓ Update resource and validate mutation contract
- ✓ Verify HTTP 2xx success status codes

### Negative Scenarios
- ✗ Invalid resource ID handling (HTTP 404)
- ✗ Invalid/missing payload validation (HTTP 400)
- ✗ Authentication/authorization failures (HTTP 401/403)
- ✗ Contract violation detection and error response behavior

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

If using an API that requires authentication:

```bash
export REQRES_API_KEY="your_api_key_here"
```

### Running Tests

**Execute full test suite:**
```bash
npm test
```

**Run API tests only:**
```bash
npm run test:api
```

**Run specific test file:**
```bash
npm test -- src/tests/users.spec.js
```

**Run with detailed output:**
```bash
npm test -- --verbose
```

## 🔍 Why Contract Testing Matters

Contract testing protects the integration boundary between services by:

1. **Early Detection** - Catches API changes before they break downstream systems
2. **Data Validation** - Verifies required fields, types, and nested object structures
3. **Reduced Ambiguity** - Defines exact expectations for request/response payloads
4. **Regression Prevention** - Prevents accidental breaking changes in API evolution
5. **Independent Validation** - Works without relying on UI automation

### Contract Testing vs. E2E Testing

| Aspect | Contract Testing | E2E Testing |
|--------|-----------------|-----------|
| **Scope** | API boundaries | Complete user workflows |
| **Speed** | Fast (headless) | Slower (browser rendering) |
| **Maintenance** | Low fragility | Higher maintenance burden |
| **Best Used For** | Data validation & integration | User experience validation |

## 💡 Quality Engineering Principles

This framework demonstrates:

- ✓ **Separation of Concerns** - Clean boundaries between clients, schemas, validation, and tests
- ✓ **DRY Code** - Reusable contract validation prevents duplicated logic
- ✓ **Intention-Revealing Code** - Test names and structure make test purpose obvious
- ✓ **Headless Execution** - API-only testing without browser overhead
- ✓ **CI/CD Ready** - Deterministic assertions with retries and timeouts
- ✓ **Enterprise Design** - Professional structure with minimal implementation overhead

## 🔧 Configuration

### Playwright Config

The `playwright.config.js` provides:
- Centralized base URL configuration
- Global headers and authentication setup
- Retry logic for transient failures
- Timeout defaults optimized for API testing
- Reporter configuration for CI/CD integration

### Schema Validation

JSON schemas define:
- Required fields
- Field types and formats
- Nested object structures
- Constraint rules (min/max, regex patterns, etc.)

## 📊 Test Example

```javascript
import { test, expect } from '@playwright/test';
import { UserClient } from '../api/clients/userClient';
import { userSchema } from '../api/schemas/userSchema';
import { validateContract } from '../api/helpers/schemaValidator';

test('should fetch user and validate contract', async ({ request }) => {
  const client = new UserClient(request);
  
  const response = await client.getUser(2);
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  validateContract(data, userSchema);
  expect(data.id).toBe(2);
  expect(data.email).toContain('@');
});
```

## 🛠️ How This Project Complements UI E2E Testing

```
Quality Testing Strategy:
┌─────────────────────────────────────┐
│  Contract Testing (This Framework)   │  ← Validates API boundaries
│  - Fast, headless execution           │  ← Catches integration failures
│  - Data contract validation           │  ← Early regression detection
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│  UI E2E Testing                      │  ← Validates user workflows
│  - Browser-based interaction         │  ← Tests UX reliability
│  - End-to-end business flows         │  ← Reduces test fragility
└─────────────────────────────────────┘
```

By validating APIs first, UI E2E suites can focus purely on user experience without debugging low-level data issues.

## 📚 Best Practices

### Writing Contract Tests

1. **Name tests intentionally** - Describe what contract element is being validated
2. **Separate setup from assertions** - Organize tests for readability
3. **Validate structure AND values** - Check both schema compliance and business logic
4. **Test error responses** - Negative scenarios are as important as positive ones
5. **Use helper functions** - Leverage `schemaValidator.js` for consistency

### Schema Design

1. **Keep schemas focused** - One schema per resource type
2. **Document field requirements** - Use schema descriptions for clarity
3. **Validate constraints** - Include min/max, regex, enum values
4. **Version schemas** - Plan for API evolution

## 🚨 Troubleshooting

**Tests timing out:**
- Check network connectivity to API
- Verify base URL in `playwright.config.js`
- Increase timeout in configuration if needed

**Schema validation failures:**
- Review API response structure against schema
- Verify required fields are present
- Check field types match schema definition

**Authentication errors:**
- Confirm API key is set: `echo $REQRES_API_KEY`
- Verify headers are configured in `playwright.config.js`

## 📝 Contributing

When adding new tests:

1. Create a new test file in `src/tests/`
2. Define or reuse a schema in `src/api/schemas/`
3. Use the appropriate client from `src/api/clients/`
4. Validate contracts using `schemaValidator.js`
5. Include both positive and negative scenarios

## 🎓 Learning Resources

- [Playwright API Testing Docs](https://playwright.dev/docs/api-testing)
- [JSON Schema Standard](https://json-schema.org/)
- [Contract Testing Principles](https://pact.foundation/)
- [REST API Best Practices](https://restfulapi.net/)

## 👨‍💻 Autor

**Eng-paloma**
- GitHub: [@Eng-paloma](https://github.com/Eng-paloma)

## ⭐ Se este projeto foi útil, deixe uma estrela!

---

**Última atualização:** 2026-05-06
## 📄 License

MIT

---

**Built with** 🎭 **Playwright** | 📋 **JSON Schema** | ✅ **Contract-First Testing**
