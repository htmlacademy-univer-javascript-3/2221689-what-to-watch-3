import { screen, render } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import PromoFilm from './promo-film';
import { mockPromoFilm } from '../../mocks/mock-promo-film';
import { NameSpace } from '../../const';

describe('Component: PromoFilm', () => {
  it('should render correctly', () => {
    const fakeStore = makeFakeStore();
    const newFakeStore = { ...fakeStore, [NameSpace.Films]: { ...fakeStore[NameSpace.Films], promoFilm: mockPromoFilm }};
    const { withStoreComponent } = withStore(withHistory(<PromoFilm promoFilm={mockPromoFilm} />), newFakeStore);

    render(withStoreComponent);

    expect(screen.getByText(mockPromoFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockPromoFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockPromoFilm.released)).toBeInTheDocument();
  });
});
