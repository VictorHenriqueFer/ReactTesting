import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');
    const weigthPokemon = screen.getByTestId('pokemon-weight');
    expect(weigthPokemon).toHaveTextContent('Average weight: 6.0 kg');
    const imgPokemon = screen.getByRole('img');
    expect(imgPokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linktoPokemon = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linktoPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });
  it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const linktoPokemon = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linktoPokemon);
    const favoritePokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoritePokemon);
    const iconFavorite = screen.getByAltText(/is marked as favorite/i);
    expect(iconFavorite).toBeInTheDocument();
    expect(iconFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
