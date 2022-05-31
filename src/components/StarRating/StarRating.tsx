import { useEffect, useState } from 'react';

import styles from './StarRating.module.css';

type StarRatingProps = {
  value: number;
  name?: string;
  label?: string;
  onChange?: (value: number) => void;
};

const StarRating = ({ value, name, label, onChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const viewOnly = !onChange;

  useEffect(() => {
    setRating(value);
    setHover(value);
  }, [value]);

  return (
    <div className={styles.starRating}>
      <label htmlFor={name}>{label}</label>
      {viewOnly ? (
        <span className="sr-only">Rating {value} out of 5</span>
      ) : null}
      <div className={viewOnly ? styles.starRatingDisabled : ''}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              name={name}
              aria-hidden={viewOnly}
              aria-label={`${index} out of 5`}
              data-testid={`rating-${index}-btn`}
              disabled={!onChange}
              key={index + value}
              className={
                index <= (hover || rating)
                  ? styles.starRatingOn
                  : styles.starRatingOff
              }
              onClick={() => {
                setRating(index);

                if (onChange) {
                  onChange(index);
                }
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StarRating;
