import React from "react";
import { LIMITE_MOBILE } from "../constantes";

export const useMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  const checaMobile = React.useCallback(({ target: screenInfo }) => {
    setIsMobile(screenInfo.innerWidth < LIMITE_MOBILE);
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", checaMobile);

    return () => {
      window.removeEventListener("resize", checaMobile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return React.useMemo(() => ({
    isMobile,
  }), [isMobile]);
}