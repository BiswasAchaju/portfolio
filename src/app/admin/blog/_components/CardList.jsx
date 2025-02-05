import React from "react";
import DeleteForm from "../../_components/DeleteForm";
import EditClients from "./EditForm";

export default function CardList({
  data = [], 
  setData,
  types,
  editBttn = true,
  deleteBtnn,
}) {
  const handleDeleteCallback = (deletedId) => {
    if (!deletedId) return;
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <div className="flex px-3 flex-wrap gap-4 w-full">
      {data?.map((blog) => (
        <div
          key={blog.id} 
          className="flex relative w-[300px] h-[100%] flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
        >
          {/* Logo */}
          <img
            className="w-full h-[220px] object-contain p-4"
            src={blog?.image}
            alt={`${blog?.title} Logo`}
          />

          {/* Client Information */}
          <div className="p-4 md:px-3 md:py-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white break-words">
                {blog?.title}
              </h3>
            </div>

            <p>
            {blog?.preview}
            </p>

            <div className="flex justify-between gap-4 pt-4">
              <div className="w-[50%]">
                <EditClients data={blog} types={types} />
                
              </div>

              {/* Delete Button */}
              {deleteBtnn && (
                <div className="w-[50%]">
                  <DeleteForm
                    id={blog?.id}
                    title={"Client"}
                    url={"http://localhost:3000/api/blogpost/delete"}
                    onDelete={handleDeleteCallback}
                  />
                </div>
              )}
            </div>

            {/* Category Information */}
            <div className="pt-2">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                Category ID: {blog?.categoryId}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
