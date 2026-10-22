# Celebrare Photo Gallery

A modern, responsive photo gallery built with React and Tailwind CSS. Browse beautiful photos, search by author, and save your favourite images with persistent storage.

**Repository:** [celebrare-photo-gallery](https://github.com/Bhushan-03/celebrare-photo-gallery)

## Features

- **Photo Gallery:** Fetches 30 photos from the Picsum Photos API.
- **Live Search:** Filter photos by author without making additional API requests.
- **Favourites:** Add or remove photos from favourites using a heart button.
- **Persistent Storage:** Favourites remain saved after refreshing the page using `localStorage`.
- **Custom React Hook:** A reusable `useFetchPhotos` hook manages photo fetching, loading, and error states.
- **State Management:** Uses `useReducer` to manage favourites.
- **Performance Optimization:** Uses `useCallback` and `useMemo` for optimized event handling and filtering.
- **Responsive Design:** Adapts to desktop, tablet, and mobile screens.
- **Loading and Error States:** Provides feedback while fetching photos and when requests fail.
- **Modern UI:** Features a clean editorial layout, warm colours, and interactive photo cards.

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Picsum Photos API
- React Hooks (`useState`, `useEffect`, `useReducer`, `useCallback`, `useMemo`)
- Browser `localStorage`

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Bhushan-03/celebrare-photo-gallery.git
   ```

2. Navigate to the project directory:

   ```bash
   cd celebrare-photo-gallery
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal, usually:

   ```text
   http://localhost:5173
   ```

## Build for Production

To create an optimized production build, run:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## API

The application retrieves photos from the Picsum Photos API:

```text
https://picsum.photos/v2/list?limit=30
```

The API provides photo information, including image IDs, author names, and image URLs.

## Project Structure

```text
celebrare-photo-gallery/
├── public/
├── src/
│   ├── hooks/
│   │   └── useFetchPhotos.js
│   ├── reducers/
│   │   └── favouritesReducer.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: The structure above highlights the main application files. Your actual repository may contain additional configuration files or components.*

## What I Learned

Through this project, I practised:

- Building reusable functionality with custom React hooks.
- Managing application state with `useReducer`.
- Optimizing callbacks and derived data using `useCallback` and `useMemo`.
- Working with an external REST API and handling asynchronous requests.
- Persisting application state with browser storage.
- Creating responsive interfaces with Tailwind CSS.
- Handling loading, empty, and error states in a React application.

## Assignment Submission

This project was developed as a frontend assignment for Celebrare.

- **GitHub Repository:** [View the source code](https://github.com/Bhushan-03/celebrare-photo-gallery)

---

**Developed by Bhushan Jadhav**

