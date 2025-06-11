import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from './App';

// Mock the child components
jest.mock('../components/Header', () => () => <div data-testid="mock-header">Header</div>);
jest.mock('../components/Sidebar', () => () => <div data-testid="mock-sidebar">Sidebar</div>);
jest.mock('../dashboard/Dashboard', () => () => <div data-testid="mock-dashboard">Dashboard</div>);
jest.mock('../billingCycle/BillingCycle', () => () => <div data-testid="mock-billing">BillingCycle</div>);

describe('App Component', () => {
  const renderApp = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  };

  test('renders main layout elements', () => {
    renderApp();
    
    expect(screen.getByRole('main')).toHaveClass('wrapper');
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
  });

  test('renders dashboard on root path', () => {
    renderApp();
    expect(screen.getByTestId('mock-dashboard')).toBeInTheDocument();
  });

  test('contains main content section', () => {
    renderApp();
    expect(screen.getByRole('region')).toHaveClass('main-content');
  });

  test('renders ToastContainer', () => {
    renderApp();
    expect(document.querySelector('.Toastify')).toBeInTheDocument();
  });
});