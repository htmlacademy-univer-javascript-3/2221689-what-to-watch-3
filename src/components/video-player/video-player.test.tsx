import { render, screen } from '@testing-library/react';
import { withHistory } from '../../mocks/mock-component';
import VideoPlayer from './video-player';

describe('Component: VideoPlayer', () => {
  it('should render correctly', () => {
    const videoPlayerTestId = 'videoPlayer';
    const preparedComponent = withHistory(<VideoPlayer srcVideo=''/>);

    render(preparedComponent);

    expect(screen.getByTestId(videoPlayerTestId)).toBeInTheDocument();
  });
});
