import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";

const Gallery = ({ setShow, images }) => {

  // ✅ FIX: copy function
  const copy_url = (url) => {
    navigator.clipboard.writeText(url);
    alert("Image URL copied!");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

      {/* Modal */}
      <div className="relative w-[95%] md:w-[70%] lg:w-[55%] h-[88vh] bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-white/60 backdrop-blur-md">
          <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
            Media Gallery
          </h2>

          <button
            onClick={() => setShow(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-all duration-300"
          >
            <AiOutlineClose />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">

          {/* Upload Box */}
          <label
            htmlFor="images"
            className="group w-full h-[170px] flex rounded-2xl border-2 border-dashed border-gray-300 hover:border-purple-500 bg-gray-50 hover:bg-purple-50 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center w-full text-gray-500 group-hover:text-purple-600 transition">
              <MdCloudUpload className="text-4xl mb-2" />
              <span className="text-sm font-medium">
                Upload or drag image
              </span>
            </div>
          </label>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">

            {images?.length > 0 &&
              images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => copy_url(img.url)}
                  className="relative group rounded-xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={img.url}
                    alt="image"
                    className="w-full h-[120px] object-cover transition duration-300 group-hover:scale-110"
                  />

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      Copy URL
                    </span>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;