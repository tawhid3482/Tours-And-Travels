import UseGallery from "../../../Hooks/UseGallery";
import GalleryImg from "./GalleryImg";

const Gallery = () => {
    const [photo]=UseGallery()
    return (
        <div>
            <h2 className="text-4xl font-bold mb-8">Visit Our Customers Tour Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
                {
                    photo?.map((img)=>(
                        <GalleryImg key={img.id} img={img}></GalleryImg>
                    ))
                }
            </div>
        </div>
    );
};

export default Gallery;