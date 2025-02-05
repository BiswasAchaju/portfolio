"use client";

import { useEffect, useState } from "react";
import CardList from "./_components/CardList";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddNew from "./_components/Addform";
import SkeletonLoader from "../_components/SkeletonLoader";

export default function Clients() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const getAllClients = async () => {
    setIsLoading(true);

    try {
      const clientResponse = await fetch("http://localhost:3000/api/blogpost");
      const clientResult = await clientResponse.json();
      if (clientResponse.ok) {
        setData(clientResult.BlogPosts || []);
      } else {
        console.error("Error fetching clients:", clientResult);
      }

      // Fetch categories
      const categoryResponse = await fetch("http://localhost:3000/api/category");
      const categoryResult = await categoryResponse.json();
      if (categoryResponse.ok) {
        setCategories(categoryResult.Category || []);
      } else {
        console.error("Error fetching categories:", categoryResult);
      }
    } catch (error) {
      console.error("Error in getAllClients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllClients();
  }, []);

  return (
    <>
      <div className="flex mt-5 px-3 sm:mt-2 items-center justify-between mb-4">
        <p className="text-xl font-medium sm:pb-0">Blogs</p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-black text-white px-3 py-5 rounded-sm hover:bg-textColor hover:contrast-200 sm:space-x-3 sm:px-4 hover:text-white flex"
            >
              <span className="hidden md:block">Add Blog</span>
              <PlusIcon />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[500px] max-h-[80%] overflow-y-auto"
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <AddNew setIsOpen={setIsOpen} types={categories} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <SkeletonLoader count={4} />
      ) : data.length > 0 ? (
        <div className="py-1">
          {/* {console.log(data)} */}
          <CardList data={data} setData={setData}  types={categories} />
        </div>
      ) : (
        <h2 className="text-center text-2xl text-textColor h-[60vh] flex items-center justify-center">
          No Data found
        </h2>
      )}
    </>
  );
}
