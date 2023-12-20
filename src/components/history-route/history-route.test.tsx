import { render, screen } from '@testing-library/react';
import HistoryRouter from './history-route';
import browserHistory from '../../browser-history';

describe('Component: HistoryRoute', () => {
  it('should render correctly', () => {
    const expectedText = 'Success';
    const preparedComponent = <HistoryRouter history={browserHistory}><p>{expectedText}</p></HistoryRouter>;
    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
