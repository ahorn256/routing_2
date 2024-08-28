import React from "react";
import { IFetchError } from "./FetchError";
import styles from './ErrorMessage.module.scss';

type Props = {
  error: IFetchError,
};

const ErrorMessage:React.FC<Props> = ({error}) => {
  return (
    <div className={styles.error}>
      <h3 className={styles.title}>Error</h3>
      <p className={styles.body}>{error.message}</p>
    </div>
  );
}

export default ErrorMessage;
