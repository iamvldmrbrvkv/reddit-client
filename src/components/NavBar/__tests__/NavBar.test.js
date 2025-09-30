import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { BrowserRouter } from 'react-router-dom';


describe('renders NavBar elements', () => {
  test('logo', () => {
    render(<NavBar />, { wrapper: BrowserRouter })
    expect(screen.getByAltText('logo')).toBeInTheDocument()
  })

  test('title', () => {
    render(<NavBar />, { wrapper: BrowserRouter })
    expect(screen.getByText(/reddit client/i)).toBeInTheDocument()
  })

  test('links', () => {
    render(<NavBar />, { wrapper: BrowserRouter })
    expect(screen.getAllByRole('link')).toHaveLength(4)
  })

  test('input', () => {
    render(<NavBar />, { wrapper: BrowserRouter })
    expect(screen.getByPlaceholderText('Search Reddit')).toBeInTheDocument()
  })
})