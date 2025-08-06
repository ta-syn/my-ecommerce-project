# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- User profile update feature.

## [1.0.0] - 2025-08-05
### Added
- **Initial Project Structure:** Complete setup for both client and server.
- **Frontend (Client):**
  - React + Vite setup for a fast development experience.
  - Component-based architecture with pages, components, and layouts.
  - State management using React Context for authentication.
  - SCSS with a modular structure for maintainable styling.
  - Routing setup with `react-router-dom`.
- **Backend (Server):**
  - Node.js + Express for the REST API.
  - Layered architecture (Controllers, Services, Models).
  - MongoDB integration with Mongoose for database operations.
  - JWT-based authentication and authorization middleware.
  - Comprehensive error handling and validation middleware.
- **DevOps & Tooling:**
  - ESLint and Prettier for code quality and consistent formatting.
  - Initial setup for CI/CD with GitHub Actions.
  - Jest and Supertest setup for backend testing.
  - Detailed documentation structure (`/docs`).