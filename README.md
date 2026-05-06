# api-contract-quality-framework

## Project Overview

This repository contains a production-oriented API contract testing framework for the ReqRes backend. It validates REST behavior, HTTP status correctness, and response contracts with Playwright APIRequestContext and JSON schema validation.

## Why ReqRes Is Used for Contract Testing

ReqRes provides a stable API designed specifically for automated validation and backend-focused testing. It is an ideal target for demonstrating how API contract checks are executed before UI automation, ensuring reliable service integration.

## Architecture

- `playwright.config.js`: centralizes request configuration, base URL, headers, retries, and timeouts.
- `src/api/clients`: encapsulates API interactions for users and authentication.
- `src/api/schemas`: reusable JSON schemas defining expected response structures.
- `src/api/helpers/schemaValidator.js`: contract validator that keeps tests concise and consistent.
- `src/tests`: intention-revealing coverage for positive and negative scenarios.

## Importance of API and Contract Testing in Quality Engineering

API contract testing is a senior-quality engineering practice that catches integration failures early. Validating payload structure, required fields, and error behavior reduces risk in downstream UI and service-layer automation.

## Covered API Scenarios

- Positive: GET `/users` validates list envelope and user data contract
- Positive: GET `/users/2` validates single user contract
- Positive: POST `/users` validates user creation contract
- Positive: POST `/login` validates successful login contract
- Negative: GET `/users/23` validates 404 response behavior
- Negative: POST `/login` without password validates 400 error behavior
- Negative: POST `/login` without email validates 400 error behavior

## How to Run Tests

1. Install dependencies:

```bash
npm install
```

2. Export a ReqRes API key:

```bash
export REQRES_API_KEY="your_reqres_api_key"
```

3. Execute the test suite:

```bash
npm test
```

4. Run API tests only:

```bash
npm run test:api
```

## How This Project Complements UI E2E Testing

This framework validates the service contracts that UI automation depends on. By catching API regressions and contract drift early, it keeps UI E2E suites focused on user flows rather than low-level data issues.

## Professional Quality Expectations

- Clean separation between clients, schema validation, and test assertions
- Reusable contract validation helper instead of repeated logic
- API-only execution with Playwright request fixtures
- CI-friendly configuration with retries and deterministic assertions


## Project Overview

`api-contract-quality-framework` is a production-oriented API quality engineering project that validates FakeStore REST endpoints using Playwright API testing and JSON contract validation. The framework focuses on backend robustness, maintainability, and early defect detection before UI integration.

## Purpose of API and Contract Testing

This repository demonstrates how API tests and contract validation serve as the first line of defense for API reliability. It verifies both functional behavior and data contracts, ensuring changes are detected before they propagate into dependent services or UI layers.

## Architecture

- `playwright.config.js`: central API test configuration scoped for headless API execution.
- `src/api/clients`: encapsulated request clients with meaningful methods for product and user operations.
- `src/api/schemas`: JSON schemas for contract validation against API payloads.
- `src/api/helpers`: reusable schema validation helper to keep assertions clean.
- `src/tests`: intention-revealing API tests separated by positive and negative coverage.

## Why Contract Testing Matters in Quality Engineering

Contract testing protects the integration boundary between services. It verifies required fields, types, and nested object structures so API changes are caught immediately, reducing ambiguity and preventing regressions that are not detectable by status codes alone.

## Covered API Scenarios

- Positive: fetch all products and validate each item contract
- Positive: fetch single product by ID and validate product schema
- Positive: create a user and validate returned contract
- Negative: invalid product ID handling and error response behavior
- Negative: invalid user payload handling and error response behavior
- Negative: missing required payload fields and contract-level validation

## How to Run Tests Locally

1. Install dependencies:

```bash
npm install
```

2. Execute the API test suite:

```bash
npm test
```

3. Run only API specs:

```bash
npm run test:api
```

## How This Project Complements UI E2E Automation

This framework is designed to validate API boundaries before UI tests execute. API contract validation identifies backend defects early, which reduces the scope and brittleness of subsequent UI E2E coverage. It complements UI automation by guaranteeing the service contracts, leaving UI tests to focus on presentation and end-user workflows.

## Quality Considerations

- Clear separation of responsibilities between clients, schemas, validation, and tests
- Reusable contract validator to avoid duplicated assertion logic
- Readable and intention-revealing tests aligned with senior QA standards
- Headless API-only execution with Playwright request fixtures
- Minimal implementation overhead while preserving enterprise-grade design
