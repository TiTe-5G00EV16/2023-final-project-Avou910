import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ArticlesList from './ArticlesList';

const TEST_ARTICLES_DATA = [
  {
    id: 'a1',
    title: 'Chair',
    price: 10.99,
    image: 'https://via.placeholder.com/150',
    email: 'test@test.com',
    userId: 'u1',
  },
  {
    id: 'a2',
    title: 'Table',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    email: 'test2@test.com',
    userId: 'u2',
  },
  {
    id: 'a3',
    title: 'Bag',
    price: 5.99,
    image: 'https://via.placeholder.com/150',
    email: 'test3@test.com',
    userId: 'u3',
  },
];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('The ArticlesList', () => {
  test('should show no articles when there are no articles available', () => {
    render(<ArticlesList items={[]} />);
    expect(screen.getByText('No articles found.')).toBeInTheDocument();
  });

  test('should show a list of articles', () => {
    render(<ArticlesList items={TEST_ARTICLES_DATA} />, { wrapper });
    expect(screen.queryByText('No articles found.')).toBeNull();
    expect(screen.getByText(/Chair/i)).toBeInTheDocument();
    expect(screen.getByText(/Table/i)).toBeInTheDocument();
    expect(screen.getByText(/Bag/i)).toBeInTheDocument();

  });
});

