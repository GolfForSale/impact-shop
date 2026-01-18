import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message = 'Something went wrong. Please try again later.' }: ErrorMessageProps) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorMessage}>
        <p className={styles.errorText}>{message}</p>
      </div>
    </div>
  );
}
