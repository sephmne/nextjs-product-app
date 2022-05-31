import { FormEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { createReview } from '../../../api/ReviewClient';
import { Review } from '../../../api/types';
import { validateEmail } from '../../../utils/validateEmail';
import Alert from '../../Alert';
import Spinner from '../../Spinner/Spinner';
import StarRating from '../../StarRating/StarRating';
import TextInput from '../../TextInput/TextInput';

const AddComment = (): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [emailError, setEmailError] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation<unknown, unknown, Review>(
    (review) => createReview(1, review),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('reviews');

        setName('');
        setEmail('');
        setRating(0);
        setComment('');
      },
    }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
    } else {
      setEmailError('');
      mutate({
        name,
        email,
        rating,
        comment,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? (
        <Alert
          title="Sorry, there has been a problem."
          message="Please come back and try commenting again a bit later."
        />
      ) : null}
      <TextInput name="name" label="Name" value={name} onChange={setName} />
      <TextInput
        name="email"
        label="Email"
        value={email}
        onChange={setEmail}
        error={emailError}
      />
      <StarRating
        name="rating"
        label="Rating"
        value={rating}
        onChange={setRating}
      />
      <TextInput
        name="comment"
        label="Comment"
        value={comment}
        type="textarea"
        onChange={setComment}
      />
      <button disabled={!name || !email || !rating || !comment} type="submit">
        Add comment
      </button>
      {isLoading ? <Spinner /> : null}
    </form>
  );
};

export default AddComment;
