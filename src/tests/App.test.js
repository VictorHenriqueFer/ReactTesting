import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste se a aplicação contém links de navegação', () => {
  renderWithRouter(<App />);

  const linkToHome = screen.getByRole('link', { name: 'Home' });
  expect(linkToHome).toHaveTextContent('Home');
  const linkToAbout = screen.getByRole('link', { name: 'About' });
  expect(linkToAbout).toHaveTextContent('About');
  const linkTofavorite = screen.getByRole('link', { name: 'Favorite Pokémon' });
  expect(linkTofavorite).toHaveTextContent('Favorite Pokémon');
});

describe('Teste se a aplicação é redirecionada para a pagina inicial', () => {
  const { history } = renderWithRouter(<App />);

  const linkToHome = screen.getByRole('link', { name: 'Home' });
  expect(linkToHome).toBeInTheDocument();
  userEvent.click(linkToHome);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});
describe('Teste se a aplicação é redirecionada para a página About', () => {
  const { history } = renderWithRouter(<App />);

  const linkToAbout = screen.getByRole('link', { name: 'About' });
  expect(linkToAbout).toBeInTheDocument();
  userEvent.click(linkToAbout);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});
describe('Teste se a aplicação é redirecionada para a pagina de Pokémon Favoritados', () => {
  const { history } = renderWithRouter(<App />);

  const linkTofavorite = screen.toHaveTextContent('link', { name: 'Pokémon Favorites' });
  expect(linkTofavorite).toBeInTheDocument();
  userEvent.click(linkTofavorite);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});
describe('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('NotFound');
  });
  const linkToNotFound = screen.getByRole('heading', { name: 'Page Not Found' });
  expect(linkToNotFound).toBeInTheDocument();
  expect(linkToNotFound).toHaveTextContent('Page Not Found');
});
