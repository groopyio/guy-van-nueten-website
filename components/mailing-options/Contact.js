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
    { country: "Belgium", email: "daan@daan.agency" },
    { country: "Netherlands", email: "daan@daan.agency" },
    { country: "Luxembourg", email: "daan@daan.agency" },
    { country: "Territories", email: "w.swinnen@telenet.be" },
  ];
  return (
    <div
      className={styles["contact-container"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div
          className={`${styles["country-email-container"]} ${
            isHovered && styles["visible"]
          }`}
        >
          {mailReferences.map((reference) => (
            <Link href={`mailto:${reference.email}`} key={reference.country}>
              <p className={styles["country-link"]}>{reference.country}</p>
            </Link>
          ))}
        </div>
      )}
      <Mail
        className={`${styles["mail-icon"]} ${isHovered && styles["on-bottom"]}`}
      />
    </div>
  );
}
