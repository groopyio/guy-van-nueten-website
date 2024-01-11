import { useEffect } from "react";

export default function SongKickWidget() {
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "//widget-app.songkick.com/injector/3536266";
      script.async = true;
      document.body.appendChild(script);
    };

    if (
      !document.querySelector(
        'script[src="//widget-app.songkick.com/injector/3536266"]'
      )
    ) {
      loadScript();
    }
  }, []);
  return (
    <a
      href="https://www.songkick.com/artists/3536266"
      className="songkick-widget"
      data-theme="dark"
      data-track-button="on"
      data-detect-style="off"
      data-background-color="rgb(0,0,0,1)"
      data-font-color="rgb(255,255,255,1)"
      data-button-bg-color="rgb(255,255,255,1)"
      data-button-text-color="rgb(0,0,0,1)"
      data-locale="en"
      data-other-artists="on"
      data-share-button="on"
      data-country-filter="on"
      data-rsvp="on"
      data-request-show="on"
      data-past-events="off"
      data-past-events-offtour="off"
      data-remind-me="off"
    />
  );
}
