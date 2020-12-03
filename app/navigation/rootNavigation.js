import React from "react";

export const navigationRef = React.createRef();

const navigate = (name, params) => {
  // ?. - is a null coalescing operator
  // If the Object is not Null then navigate() method is gonna get called
  // otherwise nothing is gonna happen
  navigationRef.current?.navigate(name, params);
};

export default {
  navigate,
};
