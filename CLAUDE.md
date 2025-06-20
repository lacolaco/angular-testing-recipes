# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Angular Testing Recipes** is a collection of testing examples for Angular applications and libraries. The project demonstrates various testing patterns using Jasmine, Karma, and Angular Testing Library. Each recipe in `/src/app/recipes/` showcases different testing approaches for components, services, and directives.

## Development Commands

```bash
# Run tests (primary development activity)
pnpm test

# Run linting checks
pnpm lint

# Fix linting issues automatically
pnpm run lint:fix

# Run visual regression tests
pnpm run vistest:check

# Update visual regression baselines
pnpm run vistest:update

# Start Storybook for component development
pnpm run storybook

# Build for production
pnpm build
```

## Architecture

### Testing Stack
- **Jasmine + Karma**: Core testing framework with ChromeHeadless runner
- **Angular Testing Library**: Component testing with `render()` and user-centric queries
- **Visual Testing**: Storybook + Storycap + reg-cli for visual regression testing

### Code Structure
- `/src/app/recipes/`: Each subdirectory contains a complete testing example with implementation and tests
- `/vistest/`: Visual testing configuration and snapshots
- Testing patterns range from traditional TestBed to modern Angular Testing Library approaches

### Component Standards
- Attribute selectors for directives (e.g., `button[app-button]`)
- Standalone components architecture
- OnPush change detection default
- `app-` prefix for custom components/directives

### Testing Patterns
- **HTTP Services**: Use `HttpTestingController` for API mocking
- **Timers**: Use `fakeAsync` and `tick` for time-based testing
- **Components**: Prefer Angular Testing Library's `render()` and ARIA queries
- **Visual Tests**: Automated screenshot comparison for UI regression detection

## Key Files
- `angular.json`: Angular CLI configuration with strict mode enabled
- `vistest/vistest.mjs`: Custom visual testing script
- Each recipe includes implementation + `.spec.ts` + optional Storybook story