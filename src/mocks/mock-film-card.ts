import { FilmCardType } from '../types/film-card.type';

export const mockFilmCard: FilmCardType = {
  id: '5d2fe5ce-ee70-408c-ac57-ab00fe0b0e24',
  name: 'Bohemian Rhapsody',
  previewImage: 'https://13.design.htmlacademy.pro/static/film/preview/bohemian_rhapsody.jpg',
  previewVideoLink: 'https://13.design.htmlacademy.pro/static//film/video/dog.mp4',
  genre: 'Drama',
  isActive: '',
  onMouseEnter: vi.fn(),
  onMouseLeave: vi.fn()
};
