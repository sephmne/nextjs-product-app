import StarRating from './StarRating';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

describe('<StarRating />', () => {
  it('displays expected rating', () => {
    render(<StarRating value={3} />);

    expect(screen.getByTestId('rating-3-btn')).toHaveClass('starRatingOn');
    expect(screen.getByTestId('rating-4-btn')).toHaveClass('starRatingOff');
  });

  it('lets user select new rating', async () => {
    const onChange = jest.fn();
    render(<StarRating value={0} onChange={onChange} />);

    fireEvent.click(screen.getByTestId('rating-4-btn'));

    await waitFor(() => expect(onChange).toHaveBeenCalledWith(4));

    expect(screen.getByTestId('rating-4-btn')).toHaveClass('starRatingOn');
    expect(screen.getByTestId('rating-5-btn')).toHaveClass('starRatingOff');
  });
});
