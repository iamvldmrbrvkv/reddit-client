import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../../theme/ThemeProvider';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </ThemeProvider>
  );
};

describe('renders NavBar elements', () => {
  test('logo', () => {
    renderWithTheme(<NavBar />);
    expect(screen.getByAltText('Reddit logo')).toBeInTheDocument();
  });

  test('title', () => {
    renderWithTheme(<NavBar />);
    expect(screen.getByText(/reddit client/i)).toBeInTheDocument();
  });

  test('navigation buttons exist', () => {
    renderWithTheme(<NavBar />);
    expect(screen.getByText('r/reddit')).toBeInTheDocument();
    expect(screen.getByText('r/help')).toBeInTheDocument();
    expect(screen.getByText('r/redditdev')).toBeInTheDocument();
    expect(screen.getByText('r/bugs')).toBeInTheDocument();
  });

  test('search input', () => {
    renderWithTheme(<NavBar />);
    expect(screen.getByPlaceholderText('Search Reddit')).toBeInTheDocument();
  });
});