import { renderHook } from '@testing-library/react';
import useFilmsByGenre from './use-films-by-genre';
import { mockPreviewFilmCards } from '../mocks/mock-preview-film-cards';
import { withHistory, withStore } from '../mocks/mock-component';
import App from '../components/app/app';
import { makeFakeStore } from '../mocks/mock-store';

describe('Hook: useFilmsByGenre', () => {
  it('should return null when empty array', () => {
    const { withStoreComponent } = withStore(withHistory(<App />), makeFakeStore());
    const {result} = renderHook(() =>
      useFilmsByGenre(mockPreviewFilmCards), {
      wrapper: () => withStoreComponent
    });
    expect(result.current).toBeNull();
  });
});
