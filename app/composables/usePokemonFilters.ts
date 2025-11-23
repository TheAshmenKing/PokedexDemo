interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

export const usePokemonFilters = (
  allPokemon: ComputedRef<Pokemon[]>,
  searchQuery: Ref<string>,
  selectedFilter: Ref<'all' | 'favorites'>,
  selectedType: Ref<string | null>
) => {
  const { myFavorites } = useFavorites();

  const filteredPokemon = computed(() => {
    let result = allPokemon.value;

    // Filter by favorites
    if (selectedFilter.value === 'favorites') {
      result = result.filter((pokemon) => myFavorites.value.includes(pokemon.id));
    }

    // Filter by type
    if (selectedType.value) {
      result = result.filter((pokemon) =>
        pokemon.types.includes(selectedType.value!)
      );
    }

    // Filter by search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query)
      );
    }
    
    return result;
  });

  return {
    filteredPokemon,
  };
};
