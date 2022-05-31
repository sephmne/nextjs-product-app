import { Review } from '../../api/types';
import StarRating from '../StarRating/StarRating';

type CommentProps = {
  review: Review;
};

const Comment = ({ review }: CommentProps): JSX.Element => {
  return (
    <div role="comment">
      <h3>{review.name}</h3>
      <StarRating value={review.rating} />
      <p>{review.comment}</p>
    </div>
  );
};

export default Comment;
