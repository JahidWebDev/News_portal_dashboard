import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdCloudUpload } from "react-icons/md";
import copy from "copy-text-to-clipboard";
import toast from "react-hot-toast";

const Gallery = ({ setShow, images = [], imageHandler }) => {

  // ✅ copy url
  const copyUrl = (url) => {
    if (!url) return;
    copy(url);
    toast.success("Copy success");
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

              // ✅ SAFE URL FIX (all cases handled)
              const imageUrl =
                img?.image
                  ? (img.image.startsWith("http")
                      ? img.image
                      : `http://localhost:5000/${img.image}`)
                  : img?.url || "";

              return (
                <div
                  key={i}
                  onClick={() => copyUrl(imageUrl)}
                  className="cursor-pointer group relative"
                >

                  <img
                    src={imageUrl}
                    alt="image"
                    className="w-full h-[100px] object-cover rounded group-hover:scale-105 transition"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/150?text=No+Image";
                    }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition rounded">
                    <span className="text-white text-xs">
                      Click to copy
                    </span>
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