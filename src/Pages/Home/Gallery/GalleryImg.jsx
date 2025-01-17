const GalleryImg = ({ img }) => {
  const { id, image } = img;
  console.log(img);
  return (
    <div>
      <div className="my-">
        <img src={image} className="w-full h-80 transition-transform duration-300 ease-in-out  hover:scale-110 " alt="gallery" />
      </div>
    </div>
  );
};

export default GalleryImg;
