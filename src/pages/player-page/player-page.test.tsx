import { screen, render, fireEvent } from '@testing-library/react';
import { withHistory, withStore } from '../../mocks/mock-component';
import { makeFakeStore } from '../../mocks/mock-store';
import PlayerPage from './player-page';

describe('Component: PlayerPage', () => {
  it('should render correctly', () => {
    const videoTestId = 'video';
    const { withStoreComponent } = withStore(withHistory(<PlayerPage />), makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId(videoTestId)).toBeInTheDocument();
  });

  it('should play video and when meta data loaded', () => {
    HTMLMediaElement.prototype.play = vi.fn();
    const { withStoreComponent } = withStore(withHistory(<PlayerPage />), makeFakeStore());

    render(withStoreComponent);
    fireEvent(screen.getByTestId('video'), new Event('loadedmetadata'));

    expect(screen.getByTestId('full-screen')).toBeInTheDocument();
  });

  it('should render pause button and when video is playing', () => {
    HTMLMediaElement.prototype.play = vi.fn();
    const { withStoreComponent } = withStore(withHistory(<PlayerPage />), makeFakeStore());

    render(withStoreComponent);
    fireEvent(screen.getByTestId('video'), new Event('loadedmetadata'));

    expect(screen.getByTestId('pause-button')).toBeInTheDocument();
  });
});
