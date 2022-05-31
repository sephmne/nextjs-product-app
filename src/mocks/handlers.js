import { rest } from 'msw';
import { reviews as staticReviews } from './data/reviews';

let reviews = [...staticReviews];

export const handlers = [
  rest.get('*/api/reviews', (req, res, ctx) => {
    return res(ctx.delay(250), ctx.json(reviews));
  }),
  rest.post('*/api/reviews', (req, res, ctx) => {
    const newReview = JSON.parse(req.body);

    reviews = [newReview, ...reviews];

    return res(ctx.delay(250), ctx.json(newReview));
  }),
];
