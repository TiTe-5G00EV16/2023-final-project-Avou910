import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import ArticleItem from "./ArticleItem";

const TEST_ARTICLE_DATA = {
  "id": 1,
  "title": "Test Article",
  "price": 9.99,
  "description": "TestiTesti",
  "image": "https://via.placeholder.com/150",
  "email": "test@test.com",
  "userId": 1
};

const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          retry: false,
      },
  },
})

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
      {children}
  </QueryClientProvider>
);

describe('The ArticleItem', () => { 
  test('Should show an article when given', ()=>{
    render(<ArticleItem 
      key={TEST_ARTICLE_DATA.id}
      id={TEST_ARTICLE_DATA.id}
      title={TEST_ARTICLE_DATA.title}
      price={TEST_ARTICLE_DATA.price}
      description={TEST_ARTICLE_DATA.description}
      image={TEST_ARTICLE_DATA.image}
      email={TEST_ARTICLE_DATA.email}
      userId={TEST_ARTICLE_DATA.userId}
    />, { wrapper });

    expect(screen.getByText('Article: Test Article')).toBeInTheDocument();
    expect(screen.getByText('Price: 9.99')).toBeInTheDocument();
    expect(screen.getByText('Description: TestiTesti')).toBeInTheDocument();
    expect(screen.getByText('Email: test@test.com')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByAltText('Test Article')).toBeInTheDocument();

    expect(screen.getByRole('listitem')).toHaveClass('article-item');
    expect(screen.getByRole('img')).toHaveAttribute('src', TEST_ARTICLE_DATA.image);

    screen.debug();
  });
});
