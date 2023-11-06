import { useEffect, useState } from "react";

function usePlaceholderInterval() {
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>("BMW");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const placeholders = [
        "BMW",
        "Kia",
        "Lexus",
        "MINI",
        "Mazda",
        "Nissan",
        "Mercedes-Benz",
        "Toyota",
        "Honda",
        "Tesla",
      ];

      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setSearchPlaceholder(placeholders[randomIndex]);
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return searchPlaceholder;
}

export default usePlaceholderInterval;
