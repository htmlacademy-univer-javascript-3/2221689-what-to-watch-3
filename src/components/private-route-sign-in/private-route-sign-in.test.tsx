import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, Routes } from 'react-router-dom';
import { withHistory } from '../../mocks/mock-component';
import { render, screen } from '@testing-library/react';
import PrivateRouteSignIn from './private-route-sign-in';

describe('Component: PrivateRouteSignIn', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push(AppRoute.SignIn);
  });

  it('should render component for public route, when user authorized', () => {
    const notExpectedText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.SignIn} element={
          <PrivateRouteSignIn authorizationStatus={AuthorizationStatus.Auth}>
            <span>{notExpectedText}</span>
          </PrivateRouteSignIn>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user not authorized', () => {
    const expectedText = 'private route';
    const notExpectedText = 'public route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={AppRoute.Film} element={<span>{notExpectedText}</span>} />
        <Route path={AppRoute.SignIn} element={
          <PrivateRouteSignIn authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{expectedText}</span>
          </PrivateRouteSignIn>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.queryByText(notExpectedText)).not.toBeInTheDocument();
  });
});
