# Todo: A task management app built with SvelteKit

This is a to-do app built using SvelteKit.

## Features Implemented
- Full CRUD operations with optimistic updates
- Image upload with drag & drop support
- List and Kanban board views
- Real-time filtering and sorting
- Inline editing for all fields
- Infinite scroll
- Delete confirmations and loading states
- Form validation with error handling
- Responsive design
- Full internationalization (Czech/English)

## Live Demo

[View the live application](https://todo-sveltekit-nine.vercel.app/)

Note: The live demo may be inconsistent because it uses Vercel's blob storage, which
seems to follow eventual consistency, instead of immediate.

## Setup

0. Clone this repo
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Open the address shown by Vite, e.g. localhost:5173

## Application structure

The structure follows a standard SvelteKit layout. The notable relevant
architecture decisions are discussed below.

### Data storage

As this is not specified in the requirements, to keep the implementation
simple, it uses an in-memory object that is serialized as JSON and optionally
synced to the storage mechanism (blob) of Vercel. It is read at startup but all
operations after that modify the data in memory and flush it to the storage. No
read is done during runtime.

The photo files are also stored in the same way, attaching the file URL to the
photo field of the task data for reference. That way, no special handling is
required to display the photo on the client.

The local vs Vercel storage is selected automatically based on the existence of
the `BLOB_READ_WRITE_TOKEN` environment variable. That allows for fast local
development and allows using Vercel in production.

### State

As required, the state is controlled from a central place. The implementation
uses a global state object in a state rune (to make it reactive.) The
reactivity aspect backs the fulfillment of the optimistic updates requirement.

It has been considered that this may cause problems in an SSR environment
causing leaks between requests. While that can be solved using contexts, that
solution requires additional setup to make it reactive at the same time because
contexts are not reactive, introducing complexity irrelevant to the
requirements. Therefore, is considered out of scope for this project.

### Deployment

The deployment is done on Vercel. Since Vercel has a dedicated app for GitHub
for handling this kind of deployment, using GitHub Actions for this was not
necessary.

## Technologies used

- SvelteKit 2.0
- TypeScript
- Tailwind CSS for styling
- Vitest for unit tests
- Playwright for E2E tests
- Zod for form validation
- Lucide for icons
- [Wuchale](https://wuchale.dev/) for i18n

## Extended features

### Change history

The provided fields for tasks did not include fields for change history.
Therefore, two fields: `created_at` and `edited_at` were added to save that
information.

### I18n and URL

I18n is done using Wuchale, because it doesn't require specific syntax to work,
it can work with existing code, providing the minimum friction to add i18n.

And while the URL layout was provided, it was necessary to add an optional locale
slug to make the i18n reliably consistent across SSR and CSR.
