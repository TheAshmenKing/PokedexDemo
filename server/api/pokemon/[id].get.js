export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pokémon ID is required',
    });
  }

  try {
    const pokemon = await $fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const species = await $fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

    // Format abilities with capital first letter
    const abilities = pokemon.abilities.map((ability) => {
      const name = ability.ability.name.replace(/-/g, ' ');
      return name.charAt(0).toUpperCase() + name.slice(1);
    });

    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: abilities,
      sprite: pokemon.sprites.front_default,
      officialArtwork: pokemon.sprites.other['official-artwork'].front_default,
      types: pokemon.types.map((t) => t.type.name),
      stats: pokemon.stats.map((s) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
      description: species.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      )?.flavor_text.replace(/\f/g, ' '),
    };
  } catch {
    throw createError({
      statusCode: 404,
      statusMessage: 'Pokémon not found',
    });
  }
});
