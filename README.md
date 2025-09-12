## State

As required, the state is controlled from a central place. The implementation
uses a global state object in a state rune (to make it reactive.) The
reactivity aspect backs the fulfillment of the optimistic updates requirement.

It has been considered that this may cause problems in an SSR environment
causing leaks between requests. While that can be solved using contexts, that
solution requires additional setup to make it reactive at the same time as
contexts are not reactive, introducing complexity irrelevant to the
requirements. Therefore, is considered out of scope for this project.

## Deployment

The deployment is done on Vercel. Since Vercel has a dedicated app for GitHub
for handling this kind of deployment, using GitHub Actions for this was not
necessary.

## Data storage

As this is not specified in the requirements, to keep the implementation
simple, it uses an in-memory object that is serialized as JSON and synced to
the storage mechanism (blob) of Vercel. It is read at startup but all
operations after that modify the data in memory and flush it to the storage. No
read is done during runtime.

The photo files are also stored in the same way, attaching the file URL to the
photo field of the task data for reference. That way, no special handling is
required to display the photo on the client.
