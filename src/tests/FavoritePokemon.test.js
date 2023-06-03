import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import pokemonList from '../data';

describe('Teste o componente Pokémon Favorito', () => {
  it('Testa se aparece alguma mensagem na pagina favoritos', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);
    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
  });
  it('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
    expect(screen.getAllByRole('link', { name: /More details/i }).length).toBe(9);
  });
});
