import CategorySelector from "@components/category_selector/CategorySelector";
import IntroductoryText from "@components/introductory_text/IntroductoryText";
import { useFetchTinaCollectionData } from "@hooks/useFetchTinaCollectionData";
import styles from "./Header.module.css";

export default function Header() {
  const [initialContent] = useFetchTinaCollectionData("initial_content");
  const introductoryText = initialContent?.introductory_text;
  return (
    <div className={styles["header-wrapper"]}>
      <CategorySelector />
      {introductoryText && <IntroductoryText text={introductoryText} />}
    </div>
  );
}
