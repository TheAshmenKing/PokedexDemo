export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const limit = query.limit ? parseInt(query.limit) : 60;
  const offset = query.offset ? parseInt(query.offset) : 0;

  try {
    // Fetch the list of Pokémon
    const response = await $fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

    // Fetch detailed data for each Pokémon to get images
    const pokemonDetails = await Promise.all(
      response.results.map(async (pokemon) => {
        const details = await $fetch(pokemon.url);
        return {
          id: details.id,
          name: details.name,
          sprite: details.sprites.front_default,
          types: details.types.map((t) => t.type.name),
        };
      })
    );

    return {
      pokemon: pokemonDetails,
      count: response.count,
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch Pokémon data',
    });
  }
});
