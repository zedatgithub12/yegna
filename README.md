# Turbo Repo Super App Starter Template

Welcome to the **Turbo Repo Super App Starter Template**, a comprehensive starter template designed to streamline the development of scalable and modular applications using shared UI libraries, hooks, utility functions, and more.

This repository provides a robust foundation for creating a "super app" with efficient branching, development, and versioning workflows. Follow the guidelines below to ensure seamless collaboration and maintain code quality.

---

## Repository Structure and Workflow

The repository is organized into distinct folders to ensure modularity and reusability:

### `/apps`
This folder contains separate portal systems for different use cases:
- **Central Portal:** The main dashboard for managing the entire application.
- **Branch Portal:** A dashboard tailored for branch-specific operations.

### `/packages`
This folder contains shared resources such as UI components, hooks, and configurations:

#### `packages/lib`
- Contains reusable hooks, utility functions, and table components.
- Includes dynamic UI-building components for forms and other interactive features.

#### `packages/ui`
- Houses Tailwind CSS-based built-in components for consistent styling.

#### `packages/tailwind-config`
- Contains shared Tailwind CSS stylesheets and configurations to maintain a unified design system.

---

## Branching Strategy

### **Starter Branch**
The `starter` branch contains the base template for initializing new projects. To start a new project:
1. Clone the starter branch using:
   ```bash
   git clone --branch starter https://gitlab.com/bersufekadgetachew/coop-super-app-web.git
   ```
2. Update dependencies such as React, Next.js, and other packages as necessary.
3. Remove the existing `.git` directory:
   ```bash
   rm -rf .git
   ```
4. Initialize a new Git repository and connect it to your project's repository.

### **Development Branch (`dev`)**
The `dev` branch serves as the primary development environment and is deployed to Vercel for testing.
- Feature branches are merged into the `dev` branch after review and testing.
- All feature pull requests (PRs) must target the `dev` branch.

### **Main Branch (`main`)**
The `main` branch is the production-ready branch.
- Pull requests to `main` must originate from the `uat` branch.

### **UAT Branch (`uat`)**
The `uat` branch is used for User Acceptance Testing (UAT).
- PRs to the `uat` branch can be submitted from the `dev` branch.

---

## Pull Request Guidelines

To maintain consistency and code quality:
1. **Branch Naming:** Name branches based on the task being worked on, e.g., `feature/auth` or `feature/mini-app`.
2. **Testing:** Ensure all changes are thoroughly tested locally before creating a PR.
3. **PR Target:**
   - Feature PRs should target the `dev` branch.
   - UAT PRs should target the `uat` branch.
   - Production PRs should target the `main` branch.
4. **PR Reviews:** Peer reviews are mandatory before merging into any branch.

---

## Versioning Guidelines

This repository follows **GitLab Versioning** for managing releases. The versioning format adheres to **Semantic Versioning (SemVer)**:

```
<major>.<minor>.<patch>
```

### Definitions
- **Major:** Introduces breaking changes that are not backward-compatible.
- **Minor:** Adds new features in a backward-compatible manner.
- **Patch:** Fixes bugs and makes backward-compatible improvements.

### Workflow
1. **Tagging Releases:** Tag stable releases in the `main` branch using GitLab’s tagging system:
   ```bash
   git tag -a v1.0.0 -m "Initial release"
   git push origin v1.0.0
   ```
2. **Release Notes:** Include detailed release notes for each version tag.
3. **Incrementing Versions:**
   - Increment the `patch` version for bug fixes.
   - Increment the `minor` version for new, backward-compatible features.
   - Increment the `major` version for breaking changes.

---

## Getting Started

### Cloning the Starter Template
1. Clone the repository from the `starter` branch:
   ```bash
   git clone --branch starter https://gitlab.com/bersufekadgetachew/coop-super-app-web.git
   ```
2. Follow the instructions under the **Starter Branch** section to set up your project.

### Development Workflow
1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Work on your changes and commit frequently with descriptive commit messages.
3. Push your branch and open a PR targeting the appropriate branch (`dev` or `uat`).

---

## Contribution Guidelines

To contribute effectively:
- Follow the branching and versioning guidelines.
- Ensure code adheres to the project’s coding standards.
- Write clear, concise, and descriptive commit messages.
- Include tests for new features or bug fixes.
- Actively participate in code reviews.

---

## Deployment

This project leverages **Vercel** for seamless deployment. Ensure that the `dev`, `uat`, and `main` branches are correctly linked to their respective environments.

---

By adhering to these guidelines, we can maintain a clean, efficient, and scalable codebase. Happy coding!