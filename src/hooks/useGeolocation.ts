import React from "react";

export const useGeolocation = () => {
  const [position, setPosition] = React.useState<GeolocationPosition | null>(
    null
  );
  const [error, setError] = React.useState<GeolocationPositionError | null>(
    null
  );

  const onChange = (position: GeolocationPosition) => {
    setPosition(position);
  };

  const onError = (error: GeolocationPositionError) => {
    setError(error);
  };

  React.useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onChange, onError);
    const watcher = navigator.geolocation.watchPosition(onChange, onError);

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return {
    position,
    error,
  };
};
