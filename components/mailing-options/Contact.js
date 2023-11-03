import { Mail } from "iconoir-react";
import Link from "next/link";
import { useState } from "react";
import styles from "./Contact.module.css";

export default function MailReferences() {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const mailReferences = [
    { country: "Belgium", email: "daan@toutpartout.be" },
    { country: "Netherlands", email: "b.jansen@mojo.nl" },
    { country: "Territories", email: "hendrik@rockoco.be" },
  ];
  return (
    <div className={styles["contact-container"]}>
      <div
        className={styles["mail-icon-container"]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Mail />
        <p
          className={`${styles["contact-placeholder"]} ${
            !isHovered && styles["visible"]
          }`}
        >
          Contact
        </p>
      </div>
      <div
        className={`${styles["country-email-container"]} ${
          isHovered && styles["visible"]
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {mailReferences.map((reference) => (
          <Link href={`mailto:${reference.email}`} key={reference.country}>
            <p className={styles["country-link"]}>{reference.country}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
