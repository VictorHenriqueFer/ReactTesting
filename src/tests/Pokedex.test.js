import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

describe('Testando o componente Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const poke = screen.getByRole('heading', { level: 2, name: /Encountered Pokémon/ });
    expect(poke).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const goButton = screen.getByTestId('next-pokemon');
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(goButton.type).toBe('button');
    expect(namePokemon).toHaveTextContent('Pikachu');
    pokemonList.forEach((pokemon, i) => {
      const expectedName = screen.getAllByTestId('pokemon-name');
      expect(expectedName).toHaveLength(1);
      expect(namePokemon).toHaveTextContent(pokemon.name);
      userEvent.click(goButton);
      if (pokemonList.length - 1 === i) {
        expect(namePokemon).toHaveTextContent(pokemonList[0].name);
      }
    });
  });
  it('Teste se a Pokédex tem os botões de filtro', async () => {
    renderWithRouter(<App />);
    const pokeType = pokemonList.reduce((prevPokemon, currPokemon) => {
      if (!prevPokemon.includes(currPokemon.type)) {
        return [...prevPokemon, currPokemon.type];
      }
    });
  });
});
