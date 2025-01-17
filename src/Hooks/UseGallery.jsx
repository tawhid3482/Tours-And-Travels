import { useEffect, useState } from "react";

const UseGallery = () => {
  const [photo, setPhoto] = useState();
  useEffect(() => {
    fetch("gallery.json")
      .then((res) => res.json())
      .then((data) => setPhoto(data));
  }, []);
  return [photo];
};

export default UseGallery;
