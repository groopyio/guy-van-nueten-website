import styles from "./IntroductoryText.module.css";

export default function IntroductoryText({ text }) {
  return <div className={styles["container"]}>{text}</div>;
}
