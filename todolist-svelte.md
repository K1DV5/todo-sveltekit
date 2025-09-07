# SvelteKit Todo Application Requirements

## Introduction

Create an interactive task management application that will allow users to effectively organize and track their work activities. The application will be built on the modern SvelteKit framework and will communicate with an existing REST API. Users will be able to not only create and manage tasks, but also visualize them in various ways - from a classic list to a Kanban board. In addition to a text description, each task can also include visual documentation in the form of attached photos. The system will also offer advanced features such as automatic deadline tracking, task categorization, and a clear visualization of work progress.

The application emphasizes:
- Intuitive user interface with multiple view types
- Efficient data management with instant response
- Robust image attachment handling
- Responsive design for use on all devices
- Optimized performance and smooth transitions between states

## Technical specifications

- SvelteKit 2.0+
- TypeScript
- Tailwind CSS for styling
- Vitest for unit tests
- Playwright for E2E tests
- Zod for form validation
- Lucide for icons

## API Specifications

The application communicates with the backend API using the following endpoints:

### 1. List of all tasks
- **Endpoint**: GET `/api/tasks/`
- **Functionality**: Get a complete list of tasks
- **Response**: Task array in JSON format
- **Usage in the application**:
- Display on the dashboard
- Kanban board
- Filterable list

### 2. Create a task
- **Endpoint**: POST `/api/tasks/`
- **Data**:
- `title`: required, max. 100 characters
- `description`: optional, max. 500 characters
- `due_date`: optional
- `photo`: optional, file (image)
- **Content-Type**: multipart/form-data
- **Response**: Created task including ID
- **Specifics**:
- Validation of all input fields
- Handling image uploads
- Handling error states

### 3. Task detail
- **Endpoint**: GET `/api/tasks/{id}/`
- **Parameters**: Task ID in URL
- **Response**: Task detail including all fields
- **Error states**: 404 if task does not exist
- **Usage**: Viewing task detail and editing

### 4. Updating task
- **Endpoint**: PUT `/api/tasks/{id}/`
- **Data**: Same structure as when creating
- **Specifics**:
- Partial update possible
- Keep existing image
- Optimistic updates

### 5. Deleting a task
- **Endpoint**: DELETE `/api/tasks/{id}/`
- **Response**: 204 No Content
- **Functionality**:
- Confirmation dialog
- Optimistic updates
- Handling error states

### 6. Nearest deadline
- **Endpoint**: GET `/api/tasks/nearest-deadline/`
- **Functionality**: Returns the task with the nearest deadline
- **Usage**: Special display on the dashboard

## Required functions

### Dashboard
1. Overview page (`/`)
- Display of the nearest deadline
- Switchable views:
- Task list
- Kanban board
- Filters and sorting
- Infinite scroll for list

### Task management
1. Task creation (`/task/new`)
- Validated form
- Image upload (drag & drop)
- Progress indicators
- Image preview before upload

2. Detail and editing (`/task/[id]`)
- Inline editing
- Attachment management
- Change history

### Technical implementation
1. State Management
- Central state management
- Optimistic updates
- Data caching

2. Performance
- Lazy loading components
- Image optimization
- Data prefetching

3. UX
- Loading states
- Error handling
- Transition animation
- Responsive design

## Testing

### Required test types
1. Unit tests
- Components
- Stores
- Utility functions

2. Integration tests
- API communication
- State management
- Form validation

3. E2E tests
- Critical user flows
- Error scenarios
- Edge cases

## Submission

### Required outputs
1. GitHub repository
- Clear structure
- Documentation
- Setup instructions

2. Functional demo
- Deployment on Vercel/Netlify
- Test data
- Access data

3. Video presentation (max. 10 minutes)
- Function demonstration
- Architectural decisions
- Interesting implementation details

### Documentation
- README.md with:
- Setup instructions
- Application architecture
- Used technologies
- Description of extension functions

## Evaluation criteria

### Key areas
1. Code quality
- TypeScript usage
- Application structure
- Code cleanliness

2. Functionality
- Requirements fulfillment
- Error handling
- Edge cases

3. Performance
- Load times
- Bundle size
- Optimization

4. UX/UI
- Responsiveness
- Accessibility
- Consistency

### Bonus points
- CI/CD pipeline
- A11Y features
- Localization (CS/EN)
- Dark/light mode
- Analytics
- SSR optimization
