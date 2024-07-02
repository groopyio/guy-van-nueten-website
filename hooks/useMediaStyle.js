import { createMedia } from "@artsy/fresnel";

const MediaStyle = createMedia({
  breakpoints: {
    mobile: 0,
    desktop: 1000,
  },
});

export const mediaStyle = MediaStyle.createMediaStyle();
export const { Media, MediaContextProvider } = MediaStyle;
