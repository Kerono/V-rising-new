import { FC } from "react";
import styles from "./pushableButton.module.scss";

type Props = { isLoading: boolean; loadMore: () => void };

const PushableButton: FC<Props> = ({ isLoading, loadMore }) => {
  return (
    <button disabled={isLoading} className={styles.pushable} onClick={loadMore}>
      <span className={styles.front}>
        {isLoading ? "Loading..." : "Add more"}
      </span>
    </button>
  );
};

export { PushableButton };
