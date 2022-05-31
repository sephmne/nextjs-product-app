import Alert from './Alert';
import { render, screen } from '@testing-library/react';

describe('<Alert />', () => {
  it('displays expected comment', () => {
    render(<Alert title="Error" message="A error happened" />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('A error happened')).toBeInTheDocument();
  });
});
