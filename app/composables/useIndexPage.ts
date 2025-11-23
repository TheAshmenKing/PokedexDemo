export const useIndexPage = () => {
  const searchQuery = ref('');
  const selectedFilter = ref<'all' | 'favorites'>('all');
  const selectedType = ref<string | null>(null);

  const pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  };

  const toggleTypeFilter = (type: string) => {
    if (selectedType.value === type) {
      selectedType.value = null;
    } else {
      selectedType.value = type;
    }
  };

  return {
    searchQuery,
    selectedFilter,
    selectedType,
    pokemonTypes,
    formatName,
    toggleTypeFilter,
  };
};
