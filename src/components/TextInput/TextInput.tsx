import styles from './TextInput.module.css';

type TextInputProps = {
  value: string;
  placeholder?: string;
  error?: string;
  name: string;
  label: string;
  type?: 'text' | 'textarea';
  onChange: (value: string) => void;
};

const TextInput = ({
  value,
  placeholder,
  error,
  name,
  label,
  type = 'text',
  onChange,
}: TextInputProps): JSX.Element => {
  const errorLabel = error ? `${name}-error` : '';

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={name}>{label}</label>
      {type === 'text' ? (
        <input
          type="text"
          id={name}
          className={styles.input}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          value={value}
          placeholder={placeholder}
          aria-describedby={errorLabel}
        />
      ) : (
        <textarea
          id={name}
          className={`${styles.input} ${styles.textArea}`}
          onChange={(event) => onChange(event.target.value)}
          value={value}
          placeholder={placeholder}
          aria-describedby={errorLabel}
        />
      )}
      {error ? (
        <span className={styles.inputError} id={errorLabel}>
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default TextInput;
