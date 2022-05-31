import { SERVER_URL } from '../config';
import { Review } from './types';

export const fetchReviews = async (
  productId: number
): Promise<Review[] | null> => {
  const response = await fetch(
    `${SERVER_URL}/api/reviews?productId=${productId}`
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

export const createReview = async (
  productId: number,
  newReview: Review
): Promise<Review> => {
  const response = await fetch(
    `${SERVER_URL}/api/reviews?productId=${productId}`,
    { method: 'POST', body: JSON.stringify(newReview) }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};
