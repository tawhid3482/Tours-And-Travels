import pic from '../../../assets/banner/bag.png'
const Experience = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-4 py-16  my-5">
      {/* Left Section */}
      <div className="lg:w-2/3 text-center lg:text-left mb-8 lg:mb-0">
        <p className="text-[#08B3AB] font-semibold text-lg mb-2">Experience</p>
        <h2 className="text-4xl font-bold text-gray-900 leading-snug">
          With all our experience, <br /> we will serve you
        </h2>
        <p className="text-gray-600 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quas aliquam,
          hic tempora inventore suscipit unde.
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start mt-8 gap-4">
          <div className="bg-orange-200 text-[#08B3AB] px-6 py-4 rounded-lg text-center">
            <p className="text-2xl font-bold">12k+</p>
            <p className="text-gray-700">Successful trip</p>
          </div>
          <div className="bg-orange-200 text-[#08B3AB] px-6 py-4 rounded-lg text-center">
            <p className="text-2xl font-bold">2k+</p>
            <p className="text-gray-700">Regular clients</p>
          </div>
          <div className="bg-orange-200 text-[#08B3AB] px-6 py-4 rounded-lg text-center">
            <p className="text-2xl font-bold">15+</p>
            <p className="text-gray-700">Years Experience</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative lg:w-1/2 flex justify-center">
        <div className="w-80 h-80 rounded-full flex items-center justify-center relative">
          <img
            src={pic} // Replace with your image URL
            alt="Tourist"
            className="w-72 h-72 object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;
