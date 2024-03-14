import { useMediaQuery } from "react-responsive";

export function useDeviceQuery() {
  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1001px)" });

  return { isMobile, isDesktop };
}
