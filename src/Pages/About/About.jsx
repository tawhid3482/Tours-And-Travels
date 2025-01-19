import employs from '../../assets/banner/employes.png'
const About = () => {
    return (
        <div className="">
            {/* Hero Section */}
            <div className="relative">
                <img
                    src="https://cdn.pixabay.com/photo/2017/05/10/16/34/waterfall-2301249_640.jpg"
                    alt="Travel Destination"
                    className="w-full h-96 "
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-4xl md:text-6xl font-bold">
                        About Us
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto  py-12 md:px-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Text Section */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Explore the World with Us
                        </h2>
                        <p className="text-lg leading-relaxed mb-6">
                            At <span className="font-bold text-[#08B3AB]">Wanderlust Travels</span>, we believe that travel
                            is not just about visiting places; it's about
                            creating memories that last a lifetime. From exotic
                            beaches to adventurous mountain treks, we bring you
                            closer to the world’s most fascinating destinations.
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            Our mission is to provide hassle-free, affordable,
                            and unforgettable travel experiences to our
                            customers. With a dedicated team of travel experts,
                            we ensure every journey is tailor-made to suit your
                            preferences.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-6 py-3 bg-[#08B3AB] text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                        >
                            Contact Us
                        </a>
                    </div>

                    {/* Image Section */}
                    <div>
                        <img
                            src={employs}
                            alt="About Us"
                            className="rounded-lg shadow-lg w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            {/* Highlights Section */}
            <div className="py-12">
                <div className="container mx-auto  ">
                    <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">
                        Why Choose Us
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfV7v8yyJtVqi0LZCowTWMQDKsQP48Hs9Uw&s"
                                alt="Experience"
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">
                                Expert Guidance
                            </h3>
                            <p className="text-gray-600">
                                Our team of seasoned travel experts ensures you
                                get the best experiences.
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://media.istockphoto.com/id/1404137864/vector/travel-promo-vector-poster-set-design-travel-tour-text-with-package-discount-sale-collection.jpg?s=612x612&w=0&k=20&c=2_ZuZOg547i5Pc9zcc7iRQ4JaacSkuJEqnQ99BQRe74="
                                alt="Affordable"
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">
                                Affordable Packages
                            </h3>
                            <p className="text-gray-600">
                                We offer a wide range of packages to suit all
                                budgets without compromising on quality.
                            </p>
                        </div>
                        <div>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWj0lG9gNA3bD6W9XREs1_KxTgIkrApeuLT8MlUZhEO18RgGcoeZb_DNCqSGhJOPUVoAA&usqp=CAU"
                                alt="Support"
                                className="mx-auto mb-4"
                            />
                            <h3 className="text-xl font-semibold mb-2">
                                24/7 Support
                            </h3>
                            <p className="text-gray-600">
                                We are here for you, anytime, anywhere.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
