import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Feedback from './Feedback';
import { server } from '../../mocks/server';

const fillOutForm = (
  name: string,
  email: string,
  rating: string,
  comment: string
) => {
  fireEvent.change(
    screen.getByRole('textbox', {
      name: /name/i,
    }),
    { target: { value: name } }
  );

  fireEvent.change(
    screen.getByRole('textbox', {
      name: /email/i,
    }),
    { target: { value: email } }
  );

  fireEvent.click(screen.getByTestId(`rating-${rating}-btn`));

  fireEvent.change(
    screen.getByRole('textbox', {
      name: /comment/i,
    }),
    { target: { value: comment } }
  );
};

const renderFeedback = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <Feedback reviews={null} productId={1} />
    </QueryClientProvider>
  );

  await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));
};

describe('<Feedback />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('displays a expected comment', async () => {
    renderFeedback();

    await waitFor(() =>
      screen.getByText(
        'Yeah this syrup was alright! Quite liked the blueberry one!'
      )
    );
  });

  it('lets user add a new comment', async () => {
    renderFeedback();

    fillOutForm('Jacob', 'noreply@noreply.com', '4', 'This is an email');

    fireEvent.click(
      screen.getByRole('button', {
        name: /add comment/i,
      })
    );

    await waitForElementToBeRemoved(() => screen.queryByTestId('spinner'));
    await waitFor(() => screen.getByText('Jacob'));
  });

  describe('when the server is not running', () => {
    let originalConsoleError = console.error;

    beforeAll(() => {
      server.close();
      console.error = jest.fn();
    });

    afterAll(() => {
      console.error = originalConsoleError;
    });

    it('displays error when api is not working', async () => {
      console.error = jest.fn();

      renderFeedback();

      await waitFor(() =>
        screen.getByText('Please come back and try again a bit later.')
      );
    });

    it('displays error when user attempts to add comment when api is not working', async () => {
      renderFeedback();

      fillOutForm('Jacob', 'noreply@noreply.com', '4', 'This is an email');

      fireEvent.click(
        screen.getByRole('button', {
          name: /add comment/i,
        })
      );

      await waitFor(() =>
        screen.getByText(
          'Please come back and try commenting again a bit later.'
        )
      );
    });

    it('prevents user from adding a comment when nothing is input', () => {
      renderFeedback();

      expect(
        screen.getByRole('button', {
          name: /add comment/i,
        })
      ).toBeDisabled();
    });

    it('validates correct email is input', () => {
      renderFeedback();

      fillOutForm('Jacob', 'noreply', '4', 'This is an email');

      fireEvent.click(
        screen.getByRole('button', {
          name: /add comment/i,
        })
      );

      expect(
        screen.getByText('Please enter a valid email.')
      ).toBeInTheDocument();
    });
  });
});
