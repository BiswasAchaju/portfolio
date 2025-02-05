"use client";
import { useEffect, useState } from "react";
import CategoryList from "./_components/Card";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddForm from "./_components/AddForm";
import SkeletonLoader from "../_components/SkeletonLoader";

export default function Category() {
  const [isloading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const getAllCategory = async () => {
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/api/category");
    if (res.ok) {
      const result = await res.json();
      setData(result);
      setIsLoading(false);
    } else {
      console.error("Error Fetching Category");
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <div className="flex mt-5 px-3  sm:mt-2 items-center justify-between mb-4 ">
        <p className="text-xl font-medium sm:pb-0">Category</p>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-textColor text-white px-3
  py-5   rounded-sm hover:bg-textColor hover:contrast-200 sm:space-x-3 sm:px-4  hover:text-white flex"
            >
              <span className="hidden md:block">Add Category</span>
              <PlusIcon />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[500px] max-h-[80%] overflow-y-auto "
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <AddForm setIsOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      </div>

      {isloading ? (
        <SkeletonLoader count={4} />
      ) : data ? (
        <div className="py-1">
          <CategoryList data={data} setData={setData} />
        </div>
      ) : (
        <h2 className="text-center text-2xl text-textColor h-[60vh] flex items-center justify-center">
          No Category found
        </h2>
      )}
    </>
  );
}
