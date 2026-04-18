import { Link,  } from "react-router-dom";

const AddWriter = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">

      {/* HEADER */}
      <div className="flex justify-between items-center p-5 border-gray-200 border-b">
        <h2 className="text-xl font-semibold text-slate-700">
          Add Writer
        </h2>

        <Link
          className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
          to="/dashboard/writers"
        >
          Writers
        </Link>
      </div>

      {/* FORM */}
      <div className="p-6">
        <form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter name"
                className="px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-purple-500 h-11"
              />
            </div>

            {/* CATEGORY */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Category
              </label>

              <select
                name="category"
                className="px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-purple-500 h-11"
              >
                <option value="">--- select category ---</option>
                <option value="Education">Education</option>
                <option value="Travel">Travel</option>
                <option value="Health">Health</option>
                <option value="International">International</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
              </select>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-purple-500 h-11"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="px-3 py-2 border border-gray-200 rounded-md outline-none focus:border-purple-500 h-11"
              />
            </div>

          </div>

          {/* BUTTON */}
          <div className="mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition shadow-sm"
            >
              Add Writer
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddWriter;