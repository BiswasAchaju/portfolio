"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button"; // Assuming Button component is already imported
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

// Function to delete news
async function deleteData(id, title, url) {
  try {
    const response = await fetch(`${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || `Failed to delete ${title}`);
    }
    toast.success(`${title} deleted successfully!`); // Show success message
  } catch (error) {
    console.error(`Error deleting ${title}`, error);
    toast.error(error.message || `An error occurred while deleting ${title}`); // Show error message
  }
}

export default function DeleteForm({ id, title, url, onDelete }) {
  const [deletingId, setDeletingId] = useState(false); // State to manage the ID of the news to delete
  const router = useRouter();

  const handleDelete = async () => {
    if (deletingId) {
      const success = await deleteData(deletingId, title, url);
      onDelete(deletingId);
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-red-700  w-[100%] text-white px-3 py-5 space-x-3 rounded-sm hover:bg-red-700 hover:contrast-200 hover:text-white flex"
            onClick={() => setDeletingId(id)} // Set the ID of the news to delete
          >
            <Trash2 />
            <span>Delete</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-textColor hover:bg-textColor hover:contrast-200"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
