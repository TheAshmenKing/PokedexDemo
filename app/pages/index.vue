<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Pokédex</h1>
      <p class="subtitle">Discover and explore Pokémon</p>
    </header>

    <div class="filters-container">
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Pokémon by name..."
          class="search-input"
        />
      </div>

      <div class="filter-tabs">
        <button
          :class="['filter-tab', { active: selectedFilter === 'all' }]"
          @click="selectedFilter = 'all'"
        >
          All
        </button>
        <button
          :class="['filter-tab', { active: selectedFilter === 'favorites' }]"
          @click="selectedFilter = 'favorites'"
        >
          ⭐ Favorites ({{ myFavorites.length }})
        </button>
      </div>

      <div class="type-filters">
        <button
          v-for="type in pokemonTypes"
          :key="type"
          :class="['type-filter', `type-${type}`, { active: selectedType === type }]"
          @click="toggleTypeFilter(type)"
        >
          {{ type }}
        </button>
      </div>

      <div class="search-info">
        Showing {{ filteredPokemon.length }} of {{ allPokemon.length }} Pokémon
      </div>
    </div>

    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>Loading Pokémon...</p>
    </div>

    <div v-else-if="error" class="error">
      Failed to load Pokémon. Please try again later.
    </div>

    <div v-else class="pokemon-grid">
      <div
        v-for="pokemon in filteredPokemon"
        :key="pokemon.id"
        class="pokemon-card-wrapper"
      >
        <button
          class="favorite-button"
          @click.prevent="toggleFavorite(pokemon.id)"
          :title="isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'"
        >
          {{ isFavorite(pokemon.id) ? '⭐' : '☆' }}
        </button>
        <NuxtLink
          :to="`/pokemon/${pokemon.id}`"
          class="pokemon-card"
        >
          <div class="pokemon-image-container">
            <img
              :src="pokemon.sprite"
              :alt="pokemon.name"
              class="pokemon-image"
              loading="lazy"
            />
          </div>
          <div class="pokemon-info">
            <span class="pokemon-number">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
            <h3 class="pokemon-name">{{ formatName(pokemon.name) }}</h3>
            <div class="pokemon-types">
              <span
                v-for="type in pokemon.types"
                :key="type"
                :class="['type-badge', `type-${type}`]"
              >
                {{ type }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Pokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

const {
  searchQuery,
  selectedFilter,
  selectedType,
  pokemonTypes,
  formatName,
  toggleTypeFilter,
} = useIndexPage();

const { myFavorites, toggleFavorite, isFavorite } = useFavorites();

const { data, pending, error } = await useFetch<{
  pokemon: Pokemon[];
  count: number;
}>('/api/pokemon', {
  query: { limit: 60 },
});

const allPokemon = computed(() => data.value?.pokemon || []);

const { filteredPokemon } = usePokemonFilters(
  allPokemon,
  searchQuery,
  selectedFilter,
  selectedType
);
</script>

<style scoped src="~/assets/css/pages/index.css"></style>
