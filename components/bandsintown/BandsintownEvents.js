import { useEffect, useState } from "react";
import styles from "./BandsintownEvents.module.css";

export default function BandsintownEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          "https://rest.bandsintown.com/artists/id_370923/events/?app_id=798fb0be662ee3f625362641de5c815a"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading concerts...</p>;
  if (error) return <p>Error: {error}</p>;
  if (events.length === 0) return <p>No upcoming concerts.</p>;

  return (
    <>
      <hr className={styles.eventDivider} />
      {events.map((event) => {
        const date = new Date(event.datetime);
        const formattedDate = date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const ticket = event.offers?.[0];
        const ticketUrl = ticket?.url;
        const eventUrl = event?.url;

        return (
          <>
            <div key={event.id} className={styles.eventContainer}>
              <div className={styles.eventDetails}>
                <span className={styles.eventDate}>{formattedDate}</span>
                <span className={styles.eventLocation}>
                  {event.venue?.city}, {event.venue?.country}
                </span>
              </div>

              <div className={styles.buttons}>
                <a
                  href={eventUrl}
                  className={styles.eventButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  INFO
                </a>
                <a
                  href={ticketUrl}
                  className={
                    ticketUrl ? styles.ticketButton : styles.disabledButton
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TICKETS
                </a>
              </div>
            </div>
            <hr className={styles.eventDivider} />
          </>
        );
      })}
    </>
  );
}
