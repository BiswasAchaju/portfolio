import React from "react";
import { Code, Trash2 } from 'lucide-react';
import DeleteForm from "../../_components/DeleteForm";
import EditForm from "./EditForm";



export default function CategoryList({
  data,
  setData,
  editButton = true,
  deleteButton = true,
}) {
  const handleDeleteCallback = (deletedId) => {
    setData((prevData) => ({
      ...prevData,
      Category: prevData.Category.filter((item) => item.id !== deletedId),
    }));
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "code":
        return <Code className="w-6 h-6" />;
      // Add more cases for other icons as needed
      default:
        return null;
    }
  };

  return (
    <div className="flex px-3 flex-wrap gap-4 xl:gap-5 sm:gap-4 w-full">
      {data.Category &&
        data.Category.map((category) => (
          <div
            key={category.id}
            className="flex relative sm:w-[235px] h-full flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
          >
            <div className="p-4 md:px-3 md:py-4">
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary-100 dark:bg-primary-900">
                {getIconComponent(category.icon)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white break-words">
                  {category.title}
                </h3>
              </div>

              <div className="flex justify-between gap-4 pt-4">
                {editButton && <EditForm data={category} />}
                {deleteButton && (
                  <div className="w-1/2">
                    <DeleteForm
                      id={category.id}
                      title="Category"
                      url="http://localhost:3000/api/category/delete"
                      onDelete={handleDeleteCallback}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

