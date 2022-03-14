import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const Details = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
  }, [location.state]);

  return (
    <>
      <h1 data-testid="Details-heading"> user Information</h1>
      {JSON.stringify(location.state)}
    </>
  );
};
