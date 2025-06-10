# MKStack

Template for building Nostr client application with React 18.x, TailwindCSS 3.x, Vite, shadcn/ui, and Nostrify.

## Authentication

Use the `LoginArea` component to log in with your `nsec` or to generate a new account. A standalone page is available at `/auth`.

The home page now includes a login button so you can authenticate directly from the index screen.

### Cashu Wallet Hooks

Basic helpers for NIP-60 wallet data and sending NIP-61 nutzaps are available in `useCashu.ts`.
