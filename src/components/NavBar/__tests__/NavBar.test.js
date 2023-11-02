import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  render(<NavBar />, { wrapper: BrowserRouter })
})

describe('renders NavBar elements', () => {
  test('logo', () => {
    expect(screen.getByAltText('logo')).toBeInTheDocument()
  })

  test('title', () => {
    expect(screen.getByText(/reddit client/i)).toBeInTheDocument()
  })

  test('links', () => {
    expect(screen.getAllByRole('link')).toHaveLength(4)
  })

  test('input', () => {
    expect(screen.getByPlaceholderText('Search Reddit')).toBeInTheDocument()
  })
})