import { useEffect } from "react";
import { useState } from "react";

const UseReviews = () => {
  const [review, setReviews] = useState();
  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return [review]
};

export default UseReviews;
