import { useQuery } from 'react-query';
import { Doughnut } from 'react-chartjs-2';
import { fetchReviews } from '../../api/ReviewClient';
import { Review } from '../../api/types';
import AddComment from './AddComment';

import styles from './Feedback.module.css';
import Comment from '../Comment';
import Alert from '../Alert';
import Spinner from '../Spinner';

interface FeedbackProps {
  productId: number;
  reviews: Review[] | null;
}

interface Ratings {
  [index: number]: number;
}

const getPieChartData = (reviews: Review[]) => {
  const ratings: Ratings = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reviews.forEach((review) => {
    const rating = review.rating;

    ratings[rating] = ratings[rating] + 1;
  });

  return {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        data: [ratings[1], ratings[2], ratings[3], ratings[4], ratings[5]],
        backgroundColor: [
          '#E76C53',
          '#EFD077',
          '#26948B',
          '#0099A9',
          '#00FCA8',
        ],
      },
    ],
  };
};

const Feedback = ({
  productId,
  reviews: initialReviews,
}: FeedbackProps): JSX.Element => {
  const {
    data: reviews,
    error,
    isFetching,
  } = useQuery<Review[] | null, Error>(
    'reviews',
    () => fetchReviews(productId),
    {
      initialData: initialReviews,
      staleTime: initialReviews ? 1000 * 60 * 10 : 0,
    }
  );

  return (
    <div>
      <h2>Leave a comment</h2>
      <AddComment />
      {error ? (
        <Alert
          title="Sorry, there has been a problem."
          message="Please come back and try again a bit later."
        />
      ) : null}
      {isFetching ? <Spinner /> : null}
      {!error && reviews ? (
        <div className={styles.feedbackResults}>
          <div className={styles.feedbackComments}>
            <h2>Comments</h2>
            {reviews.map((review, index) => (
              <Comment key={index} review={review} />
            ))}
          </div>
          <div className={styles.feedbackRatings}>
            <h2>Ratings</h2>
            <div className={styles.feedbackDoughnutContainer}>
              <div className={styles.feedbackDoughnut}>
                <Doughnut data={getPieChartData(reviews)} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Feedback;
