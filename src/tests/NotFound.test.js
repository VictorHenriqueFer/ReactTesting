import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound', () => {
  it('Teste se a página contém um texto not found', () => {
    const { history } = renderWithRouter(<NotFound />);
    act(() => { history.push('/notfound'); });
    expect(screen.getByRole('heading', { level: 2, name: 'Page requested not found' })).toBeInTheDocument();
    const image = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
