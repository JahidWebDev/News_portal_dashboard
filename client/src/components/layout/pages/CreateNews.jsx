import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";
import Gallery from "../../content/Gallery";

const CreateNews = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
 const [show, setShow] = useState(false)
    const [images, setImages] = useState([])
  const [loader, setLoader] = useState(false);

  const editor = useRef(null);

  const imageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  const added = (e) => {
    e.preventDefault();
    setLoader(true);

    // dummy submit
    setTimeout(() => {
      setLoader(false);
      console.log({ title, description, img });
    }, 1000);
  };

  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-medium">Add News</h2>
        <Link
          className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
          to="/dashboard/news"
        >
          News
        </Link>
      </div>

      <div className="p-4">
        <form onSubmit={added}>
          {/* Title */}
          <div className="flex flex-col gap-y-2 mb-6">
            <label className="text-md font-medium text-gray-600">Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="title"
              className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
            />
          </div>

          {/* Image */}
          <div className="mb-6">
            <label className="w-full h-[240px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed">
              {img ? (
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
              ) : (
                <div className="flex flex-col items-center gap-y-2">
                  <span className="text-2xl">
                    <MdCloudUpload />
                  </span>
                  <span>Select Image</span>
                </div>
              )}
              <input
                required
                onChange={imageHandle}
                type="file"
                className="hidden"
              />
            </label>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-y-2 mb-6">
            <div className="flex items-center gap-x-2">
              <h2>Description</h2>
              <div onClick={() => setShow(true)}>
                <span className=" text-2xl cursor-pointer"><MdCloudUpload/></span>
              </div>
            </div>

            <JoditEditor
              ref={editor}
              value={description}
              tabIndex={1}
              onBlur={(newContent) => setDescription(newContent)}
            />
          </div>

          {/* Submit */}
          <div className="mt-4">
            <button
              disabled={loader}
              className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
            >
              {loader ? "loading..." : "Add News"}
            </button>
          </div>
        </form>
      </div>

      {/* Optional Gallery (only if you have component) */}

            {/* Optional Gallery (only if you have component) */}
            {
                show && <Gallery setShow={setShow} images={images} />
            }
    </div>
  );
};

export default CreateNews;
