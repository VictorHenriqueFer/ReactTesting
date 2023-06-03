import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /About/i }));
    expect(screen.getByText(/This application simulates a Pokédex,/i)).toBeInTheDocument();
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémon by type/i)).toBeInTheDocument();
    const img = screen.getByAltText('Pokédex');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
