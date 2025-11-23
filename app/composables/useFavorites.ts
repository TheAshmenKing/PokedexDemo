export const useFavorites = () => {
  const myFavorites = useState<number[]>('favorites', () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('pokemon-favorites');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const toggleFavorite = (id: number) => {
    const index = myFavorites.value.indexOf(id);
    if (index > -1) {
      myFavorites.value.splice(index, 1);
    } else {
      myFavorites.value.push(id);
    }
    
    if (import.meta.client) {
      localStorage.setItem('pokemon-favorites', JSON.stringify(myFavorites.value));
    }
  };

  const isFavorite = (id: number) => {
    return myFavorites.value.includes(id);
  };

  return {
    myFavorites,
    toggleFavorite,
    isFavorite,
  };
};
