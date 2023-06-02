import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound', () => {
  it('Teste se a página contém um texto not found', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
    const image = screen.getByAltText();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
