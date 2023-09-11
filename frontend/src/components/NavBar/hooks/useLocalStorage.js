// hooks/useLocalStorage.js
import { useState, useEffect } from "react";

function useLocalStorage(key) {
  const [value, setValue] = useState(localStorage.getItem(key) || 0);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setValue(e.newValue || 0);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return value;
}

export default useLocalStorage;
