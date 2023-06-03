import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente App', () => {
  it('Teste se a aplicação contém links de navegação', () => {
    renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    const linkTofavorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkTofavorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkToHome);
    expect(linkToHome).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Teste se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);

    const linkToAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkToAbout);
    expect(linkToAbout).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Teste se a aplicação é redirecionada para a pagina de Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkTofavorite = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(linkTofavorite).toBeInTheDocument();
    userEvent.click(linkTofavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('NotFound');
    });
    const linkToNotFound = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(linkToNotFound).toBeInTheDocument();
  });
});
