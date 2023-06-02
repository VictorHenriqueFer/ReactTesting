import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Teste o componente Pokémon Favorito', () => {
  it('Testa se aparece alguma mensagem na pagina favoritos', () => {
    renderWithRouter(<FavoritePokemon />);
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémon/ }));
    expect(screen.getByText('No favorite Pokémon found')).toBeInTheDocument();
  });
  it('Teste se apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon />);
    userEvent.click(screen.getByRole('link', { name: /More details/ }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémon/ }));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
