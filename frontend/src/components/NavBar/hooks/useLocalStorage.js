// hooks/useLocalStorage.js
import { useState, useEffect } from "react";

function useLocalStorage(key) {
  const [value, setValue] = useState(localStorage.getItem(key) || "");

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setValue(e.newValue || "");
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
