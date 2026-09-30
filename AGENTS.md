# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/app/App.tsx` into the `#root` element
- `src/app/App.tsx` - App shell: picks desktop phone mockup vs full-screen phone mode and renders the current screen
- `src/app/AppContext.tsx` - Navigation history + session state (`useApp()` hook: `go`, `back`, `isAuth`, `userName`, …). Current screen is mirrored to `location.hash`
- `src/app/routes.tsx` - Screen id → page component registry
- `src/navigation/screens.ts` - `Screen` union type and grouped screen list for the dev navigator
- `src/pages/<section>/*Screen.tsx` - One file per screen (onboarding, home, outfit, wardrobe, saved, auth, profile, states, ui-kit)
- `src/components/ui/` - Shared primitives (Btn, Tag, Img, Placeholder, Caption, Divider, BackBtn, OutfitPiece)
- `src/components/layout/` - StatusBar and BottomNav used inside screens
- `src/components/shell/` - PhoneFrame, ScreenNavigator, DevScreenMenu and ShellContext (`framed` vs `device` mode)
- `src/components/icons.tsx` - Inline SVG icon set (`I.Home`, `I.Check`, …)
- `src/constants/images.ts` - Unsplash placeholder images
- `src/data/` - Mock data (wardrobe, outfits, situations, styles). Replace with real data sources/MCP here
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and mobile meta tags
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

### Adding a screen

1. Add the id to `Screen` and `SCREEN_GROUPS` in `src/navigation/screens.ts`.
2. Create `src/pages/<section>/XxxScreen.tsx` (default export, use `useApp()` for navigation).
3. Register it in `ROUTES` in `src/app/routes.tsx` (TypeScript fails until every `Screen` is mapped).

### Display modes

- Viewport wider than 500px → `framed`: iPhone mockup + screen navigator below it.
- Viewport up to 500px (real phone) → `device`: full screen, safe-area insets, no fake status bar; in dev a slim tab on the right edge opens the screen list.
- Force with `?frame=1` / `?frame=0`. Open a specific screen with `#<screen-id>`, e.g. `/#outfit-result`.

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
