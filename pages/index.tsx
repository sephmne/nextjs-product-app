import type { NextPage } from 'next';
import Head from 'next/head';
import { fetchReviews } from '../src/api/ReviewClient';
import { Review } from '../src/api/types';
import Feedback from '../src/components/Feedback';
import styles from './Home.module.css';

interface HomeProps {
  reviews: Review[] | null;
  productId: number;
}

const Home: NextPage<HomeProps> = ({ reviews, productId }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Product reviews</title>
        <meta
          name="description"
          content="A website dedicated to reviewing the very best pancake products"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Pancake syrup</h1>
      <Feedback reviews={reviews} productId={productId} />
    </div>
  );
};

export async function getInitialProps() {
  let productId = 1;
  const reviews = await fetchReviews(productId);

  return { props: { reviews, productId } };
}

export default Home;
