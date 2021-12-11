import React, { useState } from "react";

const initialState = [];

export const FilteredContext = React.createContext();

const FilteredEvents = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <FilteredContext.Provider value={[state, setState]}>
      {children}
    </FilteredContext.Provider>
  );
};

export default FilteredEvents;
