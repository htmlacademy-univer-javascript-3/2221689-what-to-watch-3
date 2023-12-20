import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import FilmCard from './film-card';
import { mockFilmCard } from '../../mocks/mock-film-card';
import userEvent from '@testing-library/user-event';

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    const expectedFilmName = mockFilmCard.name;
    const { withStoreComponent } = withStore(withHistory(<FilmCard {...mockFilmCard}/>), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText(expectedFilmName)).toBeInTheDocument();
  });

  it('onMouseEnter should called when user put cursor on filmcard', async () => {
    const mockHandleMouseEnter = vi.fn();
    const filmCardId = 'filmcard';

    const { withStoreComponent } = withStore(withHistory(<FilmCard {...mockFilmCard} onMouseEnter={mockHandleMouseEnter}/>), makeFakeStore());

    render(withStoreComponent);
    await userEvent.hover(screen.getByTestId(filmCardId));

    expect(mockHandleMouseEnter).toBeCalled();
  });

  it('onMouseLeave should called when user removes cursor from filmcard', async () => {
    const mockHandleMouseLeave = vi.fn();
    const filmCardId = 'filmcard';

    const { withStoreComponent } = withStore(withHistory(<FilmCard {...mockFilmCard} onMouseLeave={mockHandleMouseLeave}/>), makeFakeStore());

    render(withStoreComponent);
    await userEvent.unhover(screen.getByTestId(filmCardId));

    expect(mockHandleMouseLeave).toBeCalled();
  });

  it('should render component "VideoPlayer" if film is active', () => {
    const mockId = '1';
    const mockIsActive = '1';
    const videoPlayerTestId = 'videoPlayer';
    const { withStoreComponent } = withStore(withHistory(<FilmCard {...mockFilmCard} id={mockId} isActive={mockIsActive}/>), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(videoPlayerTestId)).toBeInTheDocument();
  });

  it('should render component "PosterFilm" if film is not active', () => {
    const mockId = '1';
    const mockIsActive = '2';
    const posterTestId = 'poster';
    const { withStoreComponent } = withStore(withHistory(<FilmCard {...mockFilmCard} id={mockId} isActive={mockIsActive}/>), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(posterTestId)).toBeInTheDocument();
  });
});
