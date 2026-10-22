
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import useFetchPhotos from './hooks/useFetchPhotos';
import {
  favouritesReducer,
  getInitialFavourites,
} from './reducers/favouritesReducer';

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" d="m16 16 4 4" />
    </svg>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
      />
    </svg>
  );
}

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <article className="photo-card group overflow-hidden rounded-2xl border border-[#EAE5E2] bg-white">
      <div className="relative aspect-4/3 overflow-hidden bg-[#F0EAE7]">
        <img
          src={`https://picsum.photos/id/${photo.id}/700/500`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
        />

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-black/5 opacity-60" />

        <button
          type="button"
          onClick={() => onToggleFavourite(photo)}
          aria-label={
            isFavourite
              ? `Remove photo by ${photo.author} from favourites`
              : `Add photo by ${photo.author} to favourites`
          }
          aria-pressed={isFavourite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition duration-200 hover:scale-110 ${isFavourite
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-[#26374A] hover:bg-white hover:text-rose-500'
            }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A39A96]">
            Photographer
          </p>
          <h2 className="mt-1.5 truncate text-sm font-semibold text-[#26374A]">
            {photo.author}
          </h2>
        </div>

        <span className="shrink-0 rounded-full bg-[#F7F3F1] px-2.5 py-1 text-[11px] font-medium text-[#837773]">
          #{photo.id}
        </span>
      </div>
    </article>
  );
}

function LoadingState() {
  return (
    <div
      className="flex min-h-72 flex-col items-center justify-center gap-4"
      role="status"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-rose-100 border-t-rose-500" />
      <p className="text-sm text-[#827570]">
        Gathering beautiful moments...
      </p>
    </div>
  );
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        'celebrare-favourites',
        JSON.stringify(favourites)
      );
    } catch {
      // The gallery remains usable if browser storage is unavailable.
    }
  }, [favourites]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return photos;

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  const handleToggleFavourite = useCallback((photo) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', photo });
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F6] text-[#26374A]">
      <header className="sticky top-0 z-20 border-b border-[#EAE5E2] bg-[#FAF8F6]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FCE8EC] text-xl text-rose-500">
              ✿
            </span>

            <span className="font-serif text-2xl font-bold tracking-tight text-[#172B42]">
              Photo Gallery<span className="text-rose-500">.</span>
            </span>
          </a>

          <span className="hidden rounded-full border border-[#EAE5E2] bg-white px-4 py-2 text-xs font-medium text-[#716661] sm:inline-flex">
            A collection of moments
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-5 pb-12 pt-7 sm:px-8 sm:pt-9 lg:px-12">
        <section
          className="hero-banner relative isolate overflow-hidden rounded-3xl bg-[#172B42] px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-17"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(12, 28, 43, 0.94) 0%, rgba(23, 43, 66, 0.75) 42%, rgba(23, 43, 66, 0.08) 100%),
              url("https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=85")
            `,
          }}
        >
          <div className="relative max-w-147.5">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rose-200 sm:text-xs">
                Photo gallery
              </span>
              <span className="h-px w-9 bg-rose-300" />
            </div>

            <h1 className="mt-6 font-serif text-4xl font-medium leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[60px]">
              Beautiful moments,
              <br />
              <span className="italic text-rose-200">
                captured forever.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/80 sm:text-base">
              Explore photographs from talented creators around the
              world. Find your favourites and save the moments that
              inspire you.
            </p>

            <div className="mt-7 flex items-center gap-3 text-xs font-medium text-white/80">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-rose-200">
                <HeartIcon filled />
              </span>
              A little inspiration, every day.
            </div>
          </div>
        </section>

        <section className="mb-7 mt-11 flex flex-col gap-5 sm:mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.23em] text-rose-500 sm:text-xs">
              The collection
            </p>

            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#172B42] sm:text-4xl">
              Discover photographs
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#827570]">
              Every picture tells a different story.
            </p>
          </div>

          <div className="flex w-full items-center gap-3 rounded-full border border-[#EAE5E2] bg-white px-4 py-3 shadow-sm transition focus-within:border-rose-300 focus-within:ring-4 focus-within:ring-rose-100 sm:max-w-90">
            <span className="shrink-0 text-[#A39A96]">
              <SearchIcon />
            </span>

            <input
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by author..."
              aria-label="Search photos by author"
              className="w-full bg-transparent text-sm text-[#26374A] outline-none border-none placeholder:text-[#A39A96]"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
                className="shrink-0 text-xs font-medium text-rose-500 hover:text-rose-700"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {!loading && !error && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs font-medium text-[#827570]">
              {searchTerm.trim()
                ? `Search results for "${searchTerm.trim()}"`
                : 'A handpicked view of the collection'}
            </p>

            <span className="rounded-full bg-[#F1EAE6] px-3 py-1.5 text-xs font-semibold text-[#716661]">
              {filteredPhotos.length} of {photos.length} photos
            </span>
          </div>
        )}

        {loading ? (
          <LoadingState />
        ) : error ? (
          <div
            className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-12 text-center"
            role="alert"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-rose-500">
              <HeartIcon filled={false} />
            </div>

            <h2 className="mt-4 font-serif text-2xl text-[#172B42]">
              The photos couldn't load
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-rose-800">
              {error}
            </p>

            <p className="mt-3 text-xs text-rose-700">
              Check your internet connection and refresh the page.
            </p>
          </div>
        ) : filteredPhotos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#DCD2CD] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FCE8EC] text-rose-500">
              <SearchIcon />
            </div>

            <h2 className="mt-4 font-serif text-2xl text-[#172B42]">
              No photos found
            </h2>

            <p className="mt-2 text-sm text-[#827570]">
              Try a different author name to explore the collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.some(
                  (item) => item.id === photo.id
                )}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-[#EAE5E2] bg-white/70">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-5 py-5 sm:flex-row sm:px-8 lg:px-12">
          <div className="flex items-center gap-2.5 text-xs text-[#827570]">
            <span className="text-lg text-rose-500">✿</span>
            <span>Made with React &amp; Tailwind CSS</span>
          </div>

          <p className="font-serif text-sm italic text-[#A39A96]">
            Capture the moment.
          </p>
        </div>
      </footer>
    </div>
  );
}
