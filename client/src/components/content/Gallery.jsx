import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";

const Gallery = ({ setShow, images = [], imageHandler }) => {

  const copyUrl = (url) => {
    if (!url) return;
    copy(url);
    toast.success("Copied!");
  };

  return (
    <div className="w-screen h-screen fixed left-0 top-0 z-[9999]">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => setShow(false)}
      />

      {/* Modal */}
      <div className="absolute bg-white w-[95%] md:w-[70%] lg:w-[55%] p-4 rounded-xl h-[85vh] overflow-y-auto left-1/2 top-1/2 z-[999] -translate-x-1/2 -translate-y-1/2">

        {/* Header */}
        <div className="pb-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Gallery</h2>

          <div
            onClick={() => setShow(false)}
            className="text-xl cursor-pointer"
          >
            <AiOutlineClose />
          </div>
        </div>

        {/* Upload */}
        <label
          htmlFor="images"
          className="w-full h-[180px] flex flex-col justify-center items-center cursor-pointer border-2 border-dashed rounded text-gray-600 hover:border-purple-500 transition"
        >
          <MdCloudUpload className="text-3xl mb-2" />
          <span>Select Image</span>
        </label>

        <input
          type="file"
          id="images"
          multiple
          hidden
          onChange={imageHandler}
        />

        {/* Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">

          {Array.isArray(images) && images.length > 0 ? (
            images.map((img, i) => {

              const imageUrl = img?.image || img?.url;

              return (
                <div
                  key={i}
                  onClick={() => copyUrl(imageUrl)}
                  className="cursor-pointer group relative overflow-hidden rounded"
                >

                  {/* IMAGE */}
                  <img
                    src={imageUrl}
                    alt="gallery"
                    className="w-full h-[100px] object-cover transition duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />

                  {/* DARK HOVER LAYER */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    
                    {/* DOT ANIMATION */}
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                    </div>

                  </div>

                  {/* COPY TEXT */}
                  <div className="absolute bottom-1 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition">
                    <p className="text-white text-[10px] bg-black/60 py-[2px]">
                      Click to copy URL
                    </p>
                  </div>

                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-full text-center mt-4">
              No images found
            </p>
          )}

        </div>

      </div>
    </div>
  );
};

export default Gallery;