import React, { useRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";
import Gallery from "../../content/Gallery";
import { base_url } from "../../../config/config";
import storeContext from "../../../context/storeContext";
import axios from "axios";
import { toast } from "react-toastify";
const CreateNews = () => {
  const { store } = useContext(storeContext);
const [ setImagesLoader] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);

  const editor = useRef(null);

  // Image preview handle
  const imageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // ✅ Submit News
  const added = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", imageFile);

      const { data } = await axios.post(
        `${base_url}/api/news/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", data);

      // reset
      setTitle("");
      setDescription("");
      setImg("");
      setImageFile(null);
      setCategory("");

    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoader(false);
    }
  };

  // ✅ Get images for gallery
  const get_images = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/news/images`, // 🔥 correct endpoint (backend অনুযায়ী adjust করো)
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );

      setImages(data.images || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ✅ call images when modal opens
  useEffect(() => {
    if (show) {
      get_images();
    }
  }, [show]);

const imageHandler = async (e) => {
  const files = e.target.files;

  if (!files || files.length === 0) return;

  try {
    const formData = new FormData();

    // ✅ append multiple files
    Array.from(files).forEach((file) => {
      formData.append("images", file);
    });

    setImagesLoader(true);

    const { data } = await axios.post(
      `${base_url}/api/news/images/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${store.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setImagesLoader(false);

    // ✅ SAFE CHECK (important)
    const newImages = data.images || [];

    setImages((prev) => [...prev, ...newImages]);

    toast.success(data.message || "Images uploaded successfully");

  } catch (error) {
    console.log(error);
    setImagesLoader(false);
    toast.error(error?.response?.data?.message || "Upload failed");
  }
};

  return (
    <div className="bg-white rounded-md">
      {/* Header */}
      <div className="flex justify-between p-4">
        <h2 className="text-xl font-medium">Add News</h2>
        <Link
          className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
          to="/dashboard/news"
        >
          News
        </Link>
      </div>

      {/* Form */}
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
              className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500 outline-none h-10"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-y-2 mb-6">
            <label className="text-md font-medium text-gray-600">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="px-3 py-2 rounded-md border border-gray-300 focus:border-green-500 outline-none h-10"
            >
              <option value="">Select Category</option>
              <option value="sports">Sports</option>
              <option value="politics">Politics</option>
              <option value="tech">Tech</option>
              <option value="entertainment">Entertainment</option>
            </select>
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
              <span
                onClick={() => setShow(true)}
                className="text-2xl cursor-pointer"
              >
                <MdCloudUpload />
              </span>
            </div>

            <JoditEditor
              ref={editor}
              value={description}
              tabIndex={1}
              onBlur={(content) => setDescription(content)}
            />
          </div>

          {/* Submit */}
          <button
            disabled={loader}
            className="px-3 py-[6px] bg-purple-500 rounded-sm text-white hover:bg-purple-600"
          >
            {loader ? "Loading..." : "Add News"}
          </button>

        </form>
      </div>
          <input onChange={imageHandler} type="file" multiple id="images" />
      {/* Gallery */}
      {show && <Gallery setShow={setShow} images={images} />}
    </div>
  );
};

export default CreateNews;