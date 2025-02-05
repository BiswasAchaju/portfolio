import {
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { useState } from "react";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { EditIcon } from 'lucide-react';
  import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
  import { useRouter } from "next/navigation";
  
  const formSchema = z.object({
    title: z.string().min(1, "Required"),
    icon: z.string().nullable(),
  });
  
  export default function EditForm({ data }) {
    const [isLoad, setIsLoad] = useState(false);
    const [openBox, setOpenBox] = useState(false);
  
    const router = useRouter();
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: data?.title,
        icon: data?.icon,
      },
    });
  
    const updateData = async (values) => {
      const response = await fetch(`http://localhost:3000/api/category/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const responseData = await response.json();
      if (!response.ok) {
        setIsLoad(false);
        toast.error(responseData.error || "Something went wrong!");
      } else {
        router.refresh();
        setOpenBox(false);
        setIsLoad(false);
        form.reset();
        toast.success("Updated Successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    };
  
    async function onSubmit(values) {
      setIsLoad(true);
      try {
        values.id = data?.id;
        updateData(values);
      } catch (e) {
        setIsLoad(false);
        console.error("Error submitting form:", e);
        toast.error("An error occurred while updating the category.");
      }
    }
  
    return (
      <>
        <Dialog open={openBox} onOpenChange={setOpenBox}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-textColor w-[50%] text-white px-3 py-5 rounded-sm hover:bg-textColor hover:contrast-200 sm:space-x-3 sm:px-4 hover:text-white flex"
            >
              <span className="block">Edit</span>
              <EditIcon />
            </Button>
          </DialogTrigger>
          <DialogContent
            className="sm:max-w-[500px] max-h-[80%] overflow-y-auto"
            onPointerDownOutside={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle className="text-textColor font-semibold">
                Edit Category
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Category Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  
                  <FormField
                    control={form.control}
                    name="icon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                        <Input placeholder="icon name from lucid react" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className="flex sm:justify-center">
                  <Button
                    type="submit"
                    className="bg-textColor hover:bg-textColor hover:contrast-200 cursor-pointer px-6"
                    disabled={isLoad}
                  >
                    {isLoad ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-100"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-100"
                            fill="currentColor"
                            d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"
                          />
                        </svg>
                        Updating...
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  
  