import { Mail } from "iconoir-react";
import Link from "next/link";
import styles from "./MailReferences.module.css";

export default function mailReferences() {
  const mailReferences = [
    { country: "Belgium", email: "daan@toutpartout.be" },
    { country: "Netherlands", email: "b.jansen@mojo.nl" },
    { country: "Territories", email: "hendrik@rockoco.be" },
  ];
  return (
    <div className={styles["container"]}>
      <Mail />
      <div className={styles["countries-container"]}>
        {mailReferences.map((reference) => (
          <Link href={`mailto:${reference.email}`}>
            <p className={styles["country"]}>{reference.country}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
