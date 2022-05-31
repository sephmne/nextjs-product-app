import Comment from './Comment';
import { render, screen } from '@testing-library/react';

describe('<Comment />', () => {
  const review = {
    name: 'Jack',
    email: 'jack@noreply.com',
    comment: 'This is an awesome comment.',
    rating: 3,
  };

  it('displays expected comment', () => {
    render(<Comment review={review} />);

    expect(screen.getByText(review.name)).toBeInTheDocument();
    expect(screen.queryByText(review.email)).not.toBeInTheDocument();
    expect(screen.getByTestId('rating-3-btn')).toHaveClass('starRatingOn');
    expect(screen.getByTestId('rating-4-btn')).toHaveClass('starRatingOff');
    expect(screen.getByText(review.comment)).toBeInTheDocument();
  });
});
