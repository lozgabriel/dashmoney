import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import App from '../App';

// Mock the child components
jest.mock('../../components/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('../../components/Sidebar', () => () => <div data-testid="mock-sidebar">Sidebar</div>);
jest.mock('../../dashboard/Dashboard', () => () => <div data-testid="mock-dashboard">Dashboard</div>);
jest.mock('../../billingCycle/BillingCycle', () => () => <div data-testid="mock-billing">BillingCycle</div>);

describe('App Component', () => {
  // Cleanup after each test
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const renderApp = (route = '/') => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  describe('Layout', () => {
    test('renders main layout elements', () => {
      renderApp();
      
      expect(screen.getByRole('main')).toHaveClass('wrapper');
      expect(screen.getByTestId('mock-header')).toBeInTheDocument();
      expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    });

    test('contains main content section', () => {
      renderApp();
      expect(screen.getByRole('region')).toHaveClass('main-content');
    });

  });

  describe('Routing', () => {
    test('renders dashboard on root path', () => {
      renderApp('/');
      expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
    });

    test('renders billing cycle on /billing route', () => {
      renderApp('/billing');
      expect(screen.getByTestId('mock-billing')).toBeInTheDocument();
    });

    test('renders 404 page for unknown routes', () => {
      renderApp('/unknown-route');
      expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('handles component errors gracefully', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      const ThrowError = () => {
        throw new Error('Test error');
      };
      
      jest.mock('../../dashboard/Dashboard', () => ThrowError);
      
      renderApp();
      
      expect(screen.queryByTestId('mock-dashboard')).not.toBeInTheDocument();
      expect(screen.getByText(/algo deu errado/i)).toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });
  });

  describe('Redux Integration', () => {
    test('initializes with default redux state', () => {
      renderApp();
      const state = store.getState();
      expect(state).toBeDefined();
      expect(state.tab).toBeDefined();
      expect(state.visibleTabs).toBeDefined();
    });
  });
});