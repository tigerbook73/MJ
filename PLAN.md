# Client-Side Authentication Refactoring Plan

## Overview

Refactor client-side authentication from WebSocket-based to REST API-based authentication, following the new server architecture.

## Current State

- **Old**: WebSocket-based auth - client sends email/password over WebSocket
- **New**: REST-based auth - server provides `/auth/login`, `/auth/register`, `/auth/ws-token` endpoints
- **Issue**: Client code still uses `clientApi.signIn()` which no longer exists on server

## Server Authentication Flow (Already Implemented)

1. REST login/register → server returns JWT (7-day expiry) in httpOnly cookie
2. Client stores JWT cookie automatically (browser-managed)
3. Client calls `/auth/ws-token` with JWT cookie → receives short-lived WS token (10-min expiry)
4. WebSocket connects with WS token in handshake auth
5. `WsJwtGuard` validates WS token at connection time
6. Auto-reconnection requires fetching fresh WS token

## Proposed Changes

### 1. Use openapi-fetch for REST Auth API Client (Shared)

**Location**: `shared/src/protocols/auth-api.ts` or `client/src/client/api-client.ts`

**Note**: OpenAPI types already exist in `shared/src/api/apis.ts` (auto-generated from NestJS Swagger)

**Approach**: Use `openapi-fetch` library for type-safe API client instead of manual wrapper

- Install `openapi-fetch`: `yarn add openapi-fetch` (in client workspace)
- Create typed API client instance using `openapi-fetch`:
  ```typescript
  import createClient from "openapi-fetch";
  import type { paths } from "@mj/shared/api/apis";
  
  const apiClient = createClient<paths>({ 
    baseUrl: "/api",
    credentials: "include" // Auto-handle cookies
  });
  ```
- Use typed endpoints directly:
  - `POST /api/auth/login` → `apiClient.POST("/api/auth/login", { body })`
  - `POST /api/auth/register` → `apiClient.POST("/api/auth/register", { body })`
  - `GET /api/auth/ws-token` → `apiClient.GET("/api/auth/ws-token")`
  - `GET /api/auth/me` → `apiClient.GET("/api/auth/me")`
  - `POST /api/auth/logout` → `apiClient.POST("/api/auth/logout")`
- Benefits:
  - ✅ Full TypeScript type safety (request/response types inferred from OpenAPI spec)
  - ✅ No manual type definitions needed
  - ✅ Automatic cookie handling with `credentials: 'include'`
  - ✅ Error handling built-in
  - ✅ Lightweight (built on native `fetch`)
- use in client-side auth service

### 2. Update GameSocket Connection Flow

**Location**: `shared/src/protocols/game-socket.ts`

- Modify constructor to accept optional WS token (not JWT)
- Keep existing `connect(token)` method for reconnection
- Update error handling for token expiration
- Add callback for auth failures

### 3. Create Client Auth Service Wrapper

**Location**: `client/src/services/auth-service.ts`

- Orchestrates REST auth + WebSocket connection lifecycle
- Manages the full authentication flow:
  1. Call REST `/auth/login` or `/auth/register`
  2. Fetch WS token from `/auth/ws-token`
  3. Connect WebSocket with WS token
  4. Handle reconnection with token refresh
- Methods:
  - `login(email, password)` → `UserResponseDto`
  - `register(email, name, password)` → `UserResponseDto`
  - `logout()` → void
  - `refreshWsToken()` → string (for reconnection)
  - `getCurrentUser()` → `UserResponseDto | null`
- Emit events for auth state changes (connected, disconnected, error)

### 4. Update Client Stores (3 implementations)

#### a. Example Store
**Location**: `client/src/example/stores/example-store.ts`

- Replace `clientApi.signIn()` with auth service
- Remove password storage from state (security improvement)
- Update `setSignedIn()` to handle new flow
- Add user profile state from `/auth/me`

#### b. Justin Store
**Location**: `client/src/justin/stores/user-store.ts`

- Replace `clientApi.signIn()` with auth service
- Remove password field from state
- Update connection handling

#### c. Simon Store
**Location**: `client/src/simon/stores/` (if applicable)

- Same updates as above
- May need to create store if missing

### 5. Update Login Pages (3 implementations)

#### a. Example SignInPage
**Location**: `client/src/example/pages/SignInPage.vue`

- Replace `clientApi.signIn()` with new auth service
- Remove password persistence
- Add proper error handling for REST errors
- Add loading states

#### b. Justin LoginPage
**Location**: `client/src/justin/pages/LoginPage.vue`

- Same updates as above

#### c. Simon LoginPage
**Location**: `client/src/simon/pages/LoginPage.vue`

- Same updates as above

### 6. Auto-Reconnection with Token Refresh

**Location**: Multiple files (GameSocket, auth-service, stores)

- On WebSocket disconnect:
  1. Check if JWT is still valid (hasn't expired)
  2. Fetch new WS token from `/auth/ws-token`
  3. Reconnect WebSocket with new WS token
- On JWT expiration (401 from `/auth/ws-token`):
  1. Clear auth state
  2. Redirect to login page
  3. Show "Session expired" message

### 7. Cleanup Obsolete WebSocket Auth Code

**Locations**:
- `shared/src/protocols/apis.models.ts` - Remove `SignInRequest`, `SignInResponse`, `SignOutRequest`, `SignOutResponse`
- `shared/src/protocols/game-socket.ts` - Already clean, no WS auth code
- `server/src/game/mj-game.gateway.ts` - Remove old auth handlers (already removed)
- `server/src/game/auth.service.ts` - Delete file (if exists)

### 8. Add Register Flow (Optional)

**New files**:
- `client/src/example/pages/RegisterPage.vue`
- `client/src/justin/pages/RegisterPage.vue`
- `client/src/simon/pages/RegisterPage.vue`

Features:
- Email, name, password fields
- Password confirmation
- Validation (email format, password strength)
- Link to login page

## Implementation Benefits

- ✅ Secure JWT-based authentication with httpOnly cookies
- ✅ httpOnly cookies prevent XSS attacks
- ✅ Short-lived WS tokens (10 min) reduce attack surface
- ✅ Long-lived JWT (7 days) for good UX
- ✅ Separation of concerns (auth vs game logic)
- ✅ Follows industry best practices
- ✅ No password storage in client state/localStorage
- ✅ Automatic cookie management by browser

## Questions for Review

1. **Should I include registration pages** or focus only on login refactoring?
2. **Token storage**: Should I also store WS token in localStorage for page refresh handling, or always fetch fresh?
3. **Error handling**: Should failed WS connections auto-retry with token refresh, or just show error?
4. **Simon client**: This appears less complete - should I handle it differently or same as others?

## Implementation Order

1. ✅ Create `AuthApi` class in shared
2. ✅ Update `GameSocket` for WS token support
3. ✅ Create `auth-service.ts` wrapper in client
4. ✅ Update example implementation (store + page)
5. ✅ Update justin implementation (store + page)
6. ✅ Update simon implementation (store + page)
7. ✅ Add auto-reconnection logic
8. ✅ Clean up obsolete code
9. ⚠️ Test all three client implementations
10. ⚠️ Add registration pages (optional)

## Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials (proper error)
- [ ] Logout functionality
- [ ] WebSocket reconnection after disconnect
- [ ] Token refresh on WS reconnection
- [ ] Session expiration handling (JWT expired)
- [ ] Page refresh maintains authentication
- [ ] Multiple tabs/windows handling
- [ ] All three client implementations work
