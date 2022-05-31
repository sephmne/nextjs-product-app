import Image from 'next/image';

import styles from './Spinner.module.css';

const Spinner = (): JSX.Element => {
  return (
    <div data-testid="spinner" className={styles.spinner}>
      <Image
        src="/spinner.svg"
        alt="Loading..."
        width="200px"
        height="120px"
        priority={true}
      />
    </div>
  );
};

export default Spinner;
