import styles from './Alert.module.css';

type AlertProps = {
  title: string;
  message: string;
};

const Alert = ({ title, message }: AlertProps): JSX.Element => {
  return (
    <div className={styles.alert} role="alert">
      <strong>{title}</strong>
      <div>{message}</div>
    </div>
  );
};

export default Alert;
