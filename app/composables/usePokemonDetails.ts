export const usePokemonDetail = () => {
  const formatName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  };

  const formatStatName = (name: string) => {
    const statNames: Record<string, string> = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      speed: 'Speed',
    };
    return statNames[name] || name;
  };

  return {
    formatName,
    formatStatName,
  };
};
