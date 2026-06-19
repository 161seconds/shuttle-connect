# AGENTS.md

## Project Overview

**Shuttle Connect** is a React + TypeScript web app for helping badminton players find nearby drop-in games.

The core idea is simple:

- Players can search for badminton drop-in games by district, date, time, skill level, price, and available slots.
- Hosts can create posts for games that need extra players.
- Hosts can manually import Facebook post text by pasting it into the app.
- The app can parse that text into structured game data.
- The app uses a VietMap-ready map UI to show court locations.

This project is currently a **frontend MVP**. Do not assume there is a backend unless the user asks for one.

---

## Tech Stack

Use:

- React
- TypeScript
- Vite
- pnpm
- Plain CSS or CSS modules
- Mock data
- localStorage for simple mock persistence

Do not add heavy libraries unless clearly needed.

Avoid:

- Backend APIs unless requested
- Tailwind unless setup files are also added
- Real Facebook scraping
- Selenium, cookies, bots, or crawler-based Facebook automation
- Real authentication unless requested

---

## Package Manager

Use **pnpm**.

Common commands:

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

Do not generate `package-lock.json` or `yarn.lock`.

Keep `pnpm-lock.yaml`.

---

## Environment Variables

Use this variable for future VietMap integration:

```env
VITE_VIETMAP_API_KEY=your_vietmap_api_key_here
```

Never hard-code API keys in source code.

Provide `.env.example`, but do not commit real `.env` files.

---

## Facebook Integration Rules

The MVP must not scrape Facebook groups.

Allowed features:

1. Manual Facebook post import:
   - Host copies text from a Facebook post.
   - Host pastes it into the app.
   - The app parses the text into structured data.

2. Future official Facebook Page API placeholder:
   - Show UI or comments for future Page API integration.
   - Do not implement unofficial scraping.

Not allowed:

- Crawling Facebook groups automatically
- Using hidden cookies
- Using Selenium or browser automation
- Scraping with fake user sessions
- Bypassing Facebook permissions

Use wording like:

> Manual Facebook post import and future official Facebook Page API integration.

Do not use wording like:

> Scrape Facebook groups.

---

## Main User Roles

The app should support these mock roles:

### Player

Can:

- View home page
- Explore games
- Search and filter games
- View game details
- Contact host via displayed contact info

Player does not need login for MVP browsing.

### Host

Can:

- Create a game post
- Import Facebook post text manually
- Preview parsed data
- Create draft posts
- View submitted posts

Host should use mock login in MVP.

### Admin

Can:

- Review imported posts
- Approve posts
- Reject posts
- Mark posts as duplicate
- See parser confidence score and missing fields

Admin should use mock login in MVP.

---

## Suggested Routes / Pages

Use these pages:

```text
/
Home page

/explore
Search and map page

/host
Host dashboard

/admin
Admin review page

/about
Project explanation
```

If using simple state-based navigation instead of React Router, keep the structure clear and easy to upgrade later.

---

## Suggested Source Structure

```text
src/
  main.tsx
  App.tsx
  styles/
    global.css
  data/
    mockPosts.ts
  types/
    index.ts
  utils/
    postParser.ts
    distance.ts
  components/
    Navbar.tsx
    SearchFilters.tsx
    GameCard.tsx
    GameList.tsx
    MapView.tsx
    ImportFacebookPost.tsx
    HostPostForm.tsx
    LoginModal.tsx
    StatCard.tsx
  pages/
    HomePage.tsx
    ExplorePage.tsx
    HostDashboardPage.tsx
    AdminReviewPage.tsx
    AboutPage.tsx
```

Keep files small and focused.

---

## Core Data Types

Use TypeScript interfaces for:

- `UserRole`
- `GamePost`
- `Court`
- `Host`
- `SearchFilters`
- `ParsedFacebookPost`
- `PostStatus`
- `SourceType`

Recommended values:

```ts
export type UserRole = "PLAYER" | "HOST" | "ADMIN";

export type SourceType = "MANUAL" | "FACEBOOK_IMPORT" | "PAGE_API_PLACEHOLDER";

export type PostStatus = "OPEN" | "FULL" | "EXPIRED" | "PENDING" | "APPROVED" | "REJECTED" | "DUPLICATE";
```

---

## Parser Requirements

`postParser.ts` should parse Vietnamese badminton post text.

It should try to extract:

- Court name
- Address or district
- Date keywords:
  - `hôm nay`
  - `tối nay`
  - `mai`
  - `ngày mai`
- Time ranges:
  - `19-21h`
  - `19h-21h`
  - `7pm-9pm`
  - `19:00 - 21:00`
- Slots:
  - `cần 2`
  - `thiếu 1`
  - `tuyển 3`
  - `cần thêm 2`
- Price:
  - `80k`
  - `100k/người`
  - `70.000`
- Skill level:
  - `yếu`
  - `trung bình`
  - `tb`
  - `tb khá`
  - `khá`
  - `cứng`
  - `giao lưu`
- Contact info:
  - phone number
  - `ib`
  - `inbox`
  - `zalo`

Return:

- Parsed fields
- `confidenceScore` from 0 to 100
- `missingFields` array

Do not make the parser too complex in MVP. Regex-based parsing is enough.

---

## UI Requirements

General style:

- Modern
- Clean
- Sporty
- Friendly for students
- Responsive on desktop and mobile

Use:

- Cards
- Rounded corners
- Clear spacing
- Subtle shadows
- Badge labels
- Status colors
- Empty states
- Simple form validation

Avoid:

- Overly complicated animations
- Heavy UI libraries
- Broken placeholder buttons
- Too much text on cards

---

## VietMap Integration Placeholder

`MapView.tsx` should show a visual placeholder map first.

Include code comments like:

```ts
// Future VietMap integration:
// Use import.meta.env.VITE_VIETMAP_API_KEY here.
// Add markers based on court latitude and longitude.
```

Do not break the app if there is no API key.

---

## Game Card Requirements

Each game card should show:

- Court name
- Address / district
- Date
- Start time and end time
- Skill level
- Slots needed
- Price
- Host name
- Source type
- Status
- Contact button
- View details button

Make status and source type easy to see.

---

## Search Filter Requirements

Filters should include:

- District
- Date
- Time range
- Skill level
- Maximum price
- Available slots only

Filtering can happen on mock data in the frontend.

---

## Host Dashboard Requirements

The Host Dashboard should have:

1. Manual post form
2. Facebook post import form
3. Submitted posts list

The form should include:

- Court name
- Address
- District
- Play date
- Start time
- End time
- Skill level
- Slots needed
- Price
- Contact info
- Description

For MVP, save created posts in component state or localStorage.

---

## Admin Review Requirements

Admin page should show imported or pending posts.

For each post, show:

- Parsed data
- Original text if available
- Confidence score
- Missing fields
- Approve button
- Reject button
- Mark duplicate button

Use mock actions only.

---

## Authentication Rules

For MVP, use mock login only.

Expected behavior:

- User opens login modal.
- User selects role: Player, Host, or Admin.
- Role is saved to localStorage.
- Navbar updates based on role.
- Host Dashboard requires Host or Admin.
- Admin Review requires Admin.

Do not implement real password login unless requested.

---

## Code Style

Follow these rules:

- Use functional React components.
- Use TypeScript types for props.
- Keep components focused.
- Avoid `any` unless absolutely necessary.
- Use readable names.
- Prefer simple state management with `useState`, `useMemo`, and `useEffect`.
- Do not introduce Redux/Zustand unless requested.
- Keep CSS class names clear.
- Keep mock data realistic and Vietnamese-context friendly.

---

## Content Rules

Use the app name consistently:

```text
Shuttle Connect
```

Use badminton-related wording:

- Drop-in game
- Vãng lai
- Host
- Court
- Skill level
- Slots
- District
- Contact host

Vietnamese examples are allowed, especially for mock data.

Example post text:

```text
Tối nay sân TADA Bình Thạnh 19-21h cần 2 vãng lai trình TB khá, 80k/người, ib mình nha.
```

---

## README Requirements

README should include:

- Project name
- Short description
- Features
- Tech stack
- Install command
- Run command
- Build command
- Environment variable example
- MVP limitation about Facebook scraping

Required limitation text:

```text
This MVP does not scrape Facebook groups. It supports manual Facebook post import and future official Facebook Page API integration.
```

---

## Git Rules

Do not commit:

- `node_modules/`
- `.env`
- `.env.local`
- Build outputs
- IDE cache files

Do commit:

- Source files
- `pnpm-lock.yaml`
- `.env.example`
- README
- `.gitignore`
- AGENTS.md

---

## Definition of Done

A task is done when:

- The app runs with `pnpm dev`.
- TypeScript has no obvious errors.
- Components render without crashing.
- Mock data is visible.
- Filters work on the Explore page.
- Facebook text import parser returns a preview.
- Host and Admin pages are role-gated by mock login.
- No unofficial Facebook scraping is implemented.
