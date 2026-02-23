import { useState, useEffect } from "react";

export function useDebounce(delay = 500, minLength = 3) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    if (!search || search.length < minLength) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDebouncedSearch("");
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [search, delay, minLength]);

  return {
    search,
    setSearch,
    debouncedSearch,
  };
}
