# Flight List
This app show Flight List data, we can Filter flight by Airlines, Min/Max Price, Min/Max Duration, we also can Sort flight by Lowest Price and Shortest Duration. You can access this app [here](https://flight-list-project.netlify.app/).

## Setup Instructions

```bash
# Install packages
yarn 

# Run dev mode
yarn dev

# Build production
yarn build

```

## Project Stucture
```
public/
src/
├── app/
│   ├── api/
│   ├── layout
│   └── page
├── client-pages/
│   └── flight-list/
├── components/
│   ├── bottom-sheet/
│   ├── dual-range-slider/
│   ├── filter-view/
│   ├── flight-card/
│   ├── header/
│   ├── skeleton/
│   └── sort-view/
├── constants/
├── hooks/
├── services/
├── types/
└── utils/

```

## Architecture Decisions:
- **Using App Router:**
  Chose App Router for its routing capabilities, built-in support for layouts, server components, and improved data fetching patterns. This aligns with Next.js best practices.

- **State Management:**
  - Client-side state is managed using a combination of React Hooks (`useState`, `useEffect`) and URL search parameters.
  - Storing filter and sort settings in the URL enables sharing and bookmarking of specific flight list views.
  - This approach avoids the need for a heavier state management library.

- **Styling Solution:**
  - Tailwind CSS is used for styling, enabling rapid development with a utility-first approach.
  - This choice promotes a consistent design system across the application.

- **Component Organization:**
  - Components are grouped by feature in the `src/components` directory.
  - This modular organization enhances maintainability and promotes code reuse.

- **Data Flow:**
  - **Initial Load:** The main page (`src/app/page.tsx`) is implemented as a Server Component, responsible for fetching the initial flight data via the `getFlights` service.
  - **Client Interaction:** The `FlightListPage` (`src/client-pages/flight-list/FlightList.tsx`) is a Client Component that manages all user interactions, such as filtering and sorting.
  - **API Layer:** The `useFlights` hook retrieves data from the `/api/flights` API route. This mock a secure proxy to the server, ensuring secrete key exposed to the client.

- **Performance Considerations:**
  - **SSR:** The initial page is server-rendered for a fast user experience.
  - **Suspense & Skeletons:** React `Suspense` and `Skeleton` components provide immediate loading feedback.
  - **Debouncing:** User input is debounced to prevent excessive API calls.

## Key Features Implemented:
- Responsive Flight Card Display.
- Responsive Filter and Sort Panel, This was a top priority because filtering and sorting are core business requirements of the app.
- URL State Management for Filters and Sorting Prioritized syncing filter and sort states with URL query parameters to ensure persistence.
- Debounced Filter Updates, added debouncing to filter interactions to reduce unnecessary re-renders and API calls, improving performance.
- Loading Skeletons.
- Flight Details View.
- Mobile Filter Drawer.
- Improvements with More Time, Further improve the UI/UX of the flight detail page.

## Dependencies Used:
<details>
  <summary>Detail</summary>
  
  ### Dependencies chose to use:
  - Tailwind CSS, used Tailwind CSS for styling because it enables rapid UI development with a consistent design system and responsive utilities out of the box. Alternatives considered, CSS-in-JS solutions such as Emotion or styled-components, which provide dynamic styling and strong component encapsulation.
  ### Dependencies chose NOT to use:
  - Zustand (State Management), decided not to use Zustand because the application did not require complex global state management. For a larger or more complex application, I would use Zustand to improve state organization and maintainability.
  - Shadcn/ui or Chakra UI (UI Component Libraries), Chose not to use component libraries such as shadcn/ui or Chakra UI because the project does not contain highly complex or reusable UI components. For larger projects, I would use these libraries to speed up development and ensure UI consistency.
  - TanStack Query, did not use TanStack Query because the data-fetching requirements were relatively simple and did not involve complex caching, background refetching, or synchronization. For a more data-intensive application, I would use TanStack Query to optimize API fetching, leverage client-side caching, and improve overall performance and scalability.
</details>

## Time Breakdown:
<details>
  <summary>Detail</summary>

  ### Approximate time spent on each part:
  - Planning, init project, and slicing layout: 1 Hours
  - ⁠Setup get flight data from json file and implement filter sort logic: 2 Hours
  - ⁠Slicing responsive filter and Sort view: 1 Hours
  - ⁠Implement filter and sort fetch, include store in query param and debouncing: 2  Hours
  - ⁠Slicing responsive flight card include detail flight, and skeleton: 1 Hours
  - ⁠Finishing, write docs, and deployment: 1 Hours
  ### Total time: 8 hours
</details>

## Assumptions Made:
<details>
  <summary>Detail</summary>

  ### API Assumptions
  - Assumed that the provided flight data represents daily flight data, since it was delivered as a static JSON file.
  - I decided to store the file in the public folder and serve it as a static asset.
  - I am aware that this approach can increase bundle size and affect initial load performance.
  - A potential improvement would be to store the data in cloud storage (e.g., S3 or similar) or expose it via a proper API endpoint to reduce bundle impact and improve scalability.
  ### Business Logic Decisions
  - Implemented filtering and sorting logic on the server side to closely simulate how a real-world flight search API would behave.
  ### Mock Data for Testing
  - Created mock data to resolve city and airport names based on airport codes for the flight detail page.
</details>

## Known Issues or Limitations:
<details>
  <summary>Detail</summary>

  ### Known Bugs or Edge Cases:
  - So far, no known critical bugs or edge cases have been identified.
  ## Incomplete or Deferred Features
  Due to time constraints, the following features were not implemented:
  - Unit testing, which would help ensure long-term reliability and prevent regressions.
  - Dark mode, to improve accessibility and user preference support.
  - Keyboard navigation and full accessibility support.
</details>



