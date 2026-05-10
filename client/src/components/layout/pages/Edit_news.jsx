import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import JoditEditor from "jodit-react";
import Gallery from "../../content/Gallery";
import { base_url } from "../../../config/config";
import storeContext from "../../../context/storeContext";
import axios from "axios";
import { toast } from "react-toastify";

const Edit_news = () => {
  const { store } = useContext(storeContext);
  const { id } = useParams();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);

  const editor = useRef(null);

  // ======================
  // GET SINGLE NEWS
  // ======================
  const get_news = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/news/dashboard/news/${id}`,
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );

      const news = data?.news;

      if (!news) return;

      setTitle(news.title || "");
      setCategory(news.category || "");
      setDescription(news.description || "");
      setImg(news.image || "");

    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Failed to fetch news");
    }
  };

  // ======================
  // GET GALLERY IMAGES
  // ======================
  const get_images = async () => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/news/images`,
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );

      setImages(data?.images || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // ======================
  // INIT
  // ======================
  useEffect(() => {
    if (store?.token && id) {
      get_news();
    }
  }, [store?.token, id]);

  useEffect(() => {
    if (show) {
      get_images();
    }
  }, [show]);

  // ======================
  // IMAGE HANDLE
  // ======================
  const imageHandle = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImg(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // ======================
  // UPDATE NEWS
  // ======================
  const added = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.put(
        `${base_url}/api/dashboard/news/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store?.token}`,
          },
        }
      );

      toast.success(data?.message || "Updated successfully");

    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="p-5 bg-gray-50 rounded-xl">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5 bg-white p-4 rounded-xl shadow-sm border border-gray-100">

        <h2 className="text-lg font-semibold text-gray-700">
          Edit News
        </h2>

        <Link
          to="/dashboard/news"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm"
        >
          Back
        </Link>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">

        <form onSubmit={added}>

          {/* TITLE */}
          <div className="mb-5">
            <label className="text-sm text-gray-600">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none"
              type="text"
              required
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-5">
            <label className="text-sm text-gray-600">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="sports">Sports</option>
              <option value="politics">Politics</option>
              <option value="tech">Tech</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>

          {/* IMAGE */}
          <div className="mb-5">
            <label className="text-sm text-gray-600">Image</label>

            <label className="mt-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl h-52 cursor-pointer hover:border-green-500">

              {img ? (
                <img
                  src={img}
                  className="h-full w-full object-cover rounded-xl"
                  alt="preview"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <MdCloudUpload size={30} />
                  <p>Select Image</p>
                </div>
              )}

              <input
                type="file"
                className="hidden"
                onChange={imageHandle}
              />
            </label>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm text-gray-600">Description</label>

              <MdCloudUpload
                onClick={() => setShow(true)}
                className="text-xl cursor-pointer text-gray-500 hover:text-green-500"
              />
            </div>

            <JoditEditor
              ref={editor}
              value={description}
              onBlur={(content) => setDescription(content)}
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loader}
            className="px-5 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            {loader ? "Loading..." : "Update News"}
          </button>
        </form>
      </div>

      {/* GALLERY */}
      {show && (
        <Gallery setShow={setShow} images={images} />
      )}
    </div>
  );
};

export default Edit_news;