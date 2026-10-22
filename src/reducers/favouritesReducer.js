
function getInitialFavourites() {
    try {
        const saved = localStorage.getItem('celebrare-favourites');

        if (!saved) return [];

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function favouritesReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_FAVOURITE': {
            const alreadyFavourite = state.some(
                (photo) => photo.id === action.photo.id
            );

            if (alreadyFavourite) {
                return state.filter((photo) => photo.id !== action.photo.id);
            }

            return [...state, action.photo];
        }

        default:
            return state;
    }
}

export { favouritesReducer, getInitialFavourites };
