<template>
  <div class="container">
    <NuxtLink to="/" class="back-button">
      ← Back to Pokédex
    </NuxtLink>

    <div v-if="pending" class="loading">
      <div class="spinner"></div>
      <p>Loading Pokémon details...</p>
    </div>

    <div v-else-if="error" class="error">
      <h2>Pokémon not found</h2>
      <p>The Pokémon you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="button">Return to Pokédex</NuxtLink>
    </div>

    <div v-else-if="pokemon" class="profile">
      <div class="profile-header">
        <div class="image-section">
          <div class="image-container">
            <button
              class="favorite-button-large"
              :title="isFavorite(pokemon.id) ? 'Remove from favorites' : 'Add to favorites'"
              @click="toggleFavorite(pokemon.id)"
            >
              {{ isFavorite(pokemon.id) ? '⭐' : '☆' }}
            </button>
            <img
              :src="pokemon.officialArtwork"
              :alt="pokemon.name"
              class="pokemon-image"
            />
          </div>
        </div>

        <div class="info-section">
          <div class="header-top">
            <span class="pokemon-number">#{{ pokemon.id.toString().padStart(3, '0') }}</span>
            <h1 class="pokemon-name">{{ formatName(pokemon.name) }}</h1>
          </div>

          <div class="pokemon-types">
            <span
              v-for="type in pokemon.types"
              :key="type"
              :class="['type-badge', `type-${type}`]"
            >
              {{ type }}
            </span>
          </div>

          <p v-if="pokemon.description" class="description">
            {{ pokemon.description }}
          </p>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Height</div>
              <div class="stat-value">{{ (pokemon.height / 10).toFixed(1) }} m</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Weight</div>
              <div class="stat-value">{{ (pokemon.weight / 10).toFixed(1) }} kg</div>
            </div>
          </div>

          <div class="abilities-section">
            <h3 class="section-title">Abilities</h3>
            <p class="abilities-text">{{ pokemon.abilities.join(', ') }}</p>
          </div>

          <div class="base-stats">
            <h3 class="section-title">Base Stats</h3>
            <div class="stats-list">
              <div v-for="stat in pokemon.stats" :key="stat.name" class="stat-row">
                <span class="stat-name">{{ formatStatName(stat.name) }}</span>
                <div class="stat-bar-container">
                  <div
                    class="stat-bar"
                    :style="{ width: `${(stat.value / 255) * 100}%` }"
                  ></div>
                </div>
                <span class="stat-number">{{ stat.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="navigation-buttons">
        <NuxtLink
          v-if="pokemon.id > 1"
          :to="`/pokemon/${pokemon.id - 1}`"
          class="nav-button"
        >
          ← Previous
        </NuxtLink>
        <NuxtLink
          :to="`/pokemon/${pokemon.id + 1}`"
          class="nav-button"
        >
          Next →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  sprite: string;
  officialArtwork: string;
  types: string[];
  stats: Array<{ name: string; value: number }>;
  description?: string;
}

const route = useRoute();
const pokemonId = route.params.id;

const { formatName, formatStatName } = usePokemonDetail();
const { myFavorites, toggleFavorite, isFavorite } = useFavorites();

const { data: pokemon, pending, error } = await useFetch<PokemonDetail>(
  `/api/pokemon/${pokemonId}`
);
</script>

<style scoped src="~/assets/css/pages/pokemon-detail.css"></style>
