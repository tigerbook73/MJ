# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Analysis Scope

This repository is a full-stack monorepo.

Unless explicitly requested:

- Ignore all frontend implementation details.
- Do NOT analyze anything under `client/` or `react/`.
- Do NOT analyze UI components, pages, or stores.
- Treat the frontend as an external API/WebSocket consumer.

Architecture and dependency analysis should focus on:

- `server/`
- `shared/`

Database migrations, generated files, and test files should also be ignored unless specifically requested.

## Project Summary

Multiplayer Mahjong game — a full-stack TypeScript monorepo with real-time WebSocket gameplay.

## Commands

### Development
```bash
yarn dev-server          # Start NestJS server in watch mode
yarn dev-client          # Start Quasar dev server
```

### Build
```bash
yarn build               # Build server + client (client output copies into server/public)
yarn build-server        # Server only (runs Prisma migrate, generate, API gen, then nest build)
yarn build-client        # Client only (quasar build + copy to server/public)
```

### Test
```bash
yarn test                # Run all unit tests (server + client)
yarn test-server         # Server unit tests only (Jest)
yarn test-client         # Client unit tests only (Jest, --passWithNoTests)
yarn test:e2e            # E2E tests (server + client)
cd server && yarn test -- --testPathPattern=mj.game  # Run a single test file
```

### Lint
```bash
yarn lint                # Lint server + client
yarn lint-server         # ESLint + tsc --noEmit for server
yarn lint-client         # ESLint + vue-tsc --noEmit for client
```

### Database
```bash
cd server && yarn prisma migrate dev    # Run migrations
cd server && yarn db:seed               # Seed demo users (alice, bob, charlie, diana)
cd server && yarn db:reset              # Reset database
```

### API
```bash
yarn api:gen             # Generate OpenAPI spec from NestJS Swagger decorators
```

## Architecture

### Monorepo (Yarn Workspaces)

Three packages:

- **`server/`** (`@mj/server`) — NestJS backend with WebSocket gateway, REST API, Prisma/SQLite database
- **`client/`** (`@mj/client`) — Quasar/Vue 3 frontend with Pinia state management
- **`shared/`** (`@mj/shared`) — Core game logic, data models, protocol definitions (no runtime dependencies)

Both `server` and `client` depend on `@mj/shared`. The shared package is referenced via Yarn workspace resolution and TypeScript path aliases (`@mj/shared` mapped in tsconfig).

### Server (`server/src/`)

NestJS modular architecture with two main concerns:

1. **REST API** (`auth/`, `user/`) — JWT authentication (Passport + argon2 password hashing), user CRUD. Swagger docs available at runtime.
2. **WebSocket Gateway** (`game/`) — Socket.IO-based real-time game engine. `MjGameGateway` routes all game messages through a handler map pattern. Supporting services: `ClientService` (connection tracking), `RoomService` (room lifecycle), `GameService` (game logic), `UserService` (in-memory game user state), `AuthService` (WebSocket-level JWT auth).

The gateway uses a single event channel (`mj:game`) with typed request/response envelopes (`GameRequest`/`GameResponse`). Handlers are registered in a `Map<GameRequestType, { handler, update }>` where `update: true` triggers a broadcast of full game state to all clients.

### Client (`client/src/`) -- Outside Scope

Three separate UI implementations exist:
- **`example/`** — Reference/beginner implementation
- **`justin/`** — Feature-rich UI variant
- **`simon/`** — Alternative UI variant

Each has its own pages, components, stores, and routes. They share the same backend connection via `GameSocket` (from shared).

### New Client Implementations
- A new client is being implemented in another repository:
  - React + Next.js
  - TypeScript
  - Tailwind CSS
  - Uses `GameSocket` from `@mj/shared` for WebSocket communication
- Location: ../mj-next

### Shared (`shared/src/`)

- **`core/`** — Mahjong game engine (`mj.game.ts`): tile system, player positions (East/South/West/North), game actions (Drop, Chi, Peng, Gang, Angang, Zimo, Hu, Pass)
- **`models/`** — Data models: `RoomModel`, `PlayerModel`, `UserModel`, `ClientModel`
- **`protocols/`** — `GameSocket` class (Socket.IO wrapper with auth, reconnection, token storage), request/response type definitions
- **`api/`** — OpenAPI definitions for REST endpoints

### Authentication Flow

1. REST login/register → server returns JWT (1-hour expiry)
2. Client stores token via `TokenStorage` interface (`localTokenStorage` uses localStorage)
3. WebSocket connects with JWT in handshake auth
4. `WsJwtGuard` validates token at connection time
5. Auto sign-in for authenticated users on reconnection

### Game Flow

1. WebSocket connection with JWT auth
2. Create/join room (up to 4 players, assigned positions)
3. Start game → initializes Mahjong game instance in `GameService`
4. Players send actions via `GameRequest` → gateway routes to handler → broadcasts updated state
5. Auto-play interval runs every 1.5 seconds for AI/timeout actions

### Database

Prisma ORM with SQLite (better-sqlite3 adapter). Schema at `server/prisma/schema.prisma`. Single `User` model. Migrations in `server/prisma/migrations/`.

## Key Conventions

- **TypeScript strict mode** on server; path alias `@mj/shared` for cross-package imports
- **ESLint flat config** (`eslint.config.mjs`) with Prettier integration; relaxed `any` rules
- **Const objects over enums** for type definitions (recent refactor pattern)
- **Promise-based WebSocket responses** with 2-second timeout in `GameSocket`
