import TextInput from './TextInput';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

describe('<TextInput />', () => {
  it('displays expected text input and allows editing', async () => {
    const onChange = jest.fn();

    render(<TextInput value="" name="Test" label="Test" onChange={onChange} />);

    const input = screen.getByRole('textbox', { name: 'Test' });

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'H' } });

    await waitFor(() => expect(onChange).toHaveBeenCalledWith('H'));
  });

  it('displays expected textarea and allows editing', async () => {
    const onChange = jest.fn();

    render(
      <TextInput
        value=""
        name="Test"
        label="Test"
        onChange={onChange}
        type="textarea"
      />
    );

    const input = screen.getByRole('textbox', { name: 'Test' });

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'P' } });

    await waitFor(() => expect(onChange).toHaveBeenCalledWith('P'));
  });
});
