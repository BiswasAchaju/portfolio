import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import imageToUrl from "@nepaltechinnov/img-to-url";

const formSchema = z.object({
  title: z.string(),
  image: z.string(),
  categoryId: z.string(),
});

export default function EditForm({ data, types }) {
  const [imageFile, setImageFile] = useState();
  const [imagePreview, setImagePreview] = useState(data?.image);
  const [isLoad, setIsLoad] = useState(false);
  const [openBox, setOpenBox] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title,
      image: data?.image,
      categoryId: data?.categoryId.toString(),
    },
  });

  // Handling image selection
  const handleImageChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateData = async (values) => {
    const response = await fetch(`http://localhost:3000/api/blogpost/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (!response.ok) {
      setIsLoad(false);
      toast.error(data.error || "Something went wrong!");
    } else {
      router.refresh();
      setOpenBox(false);
      setIsLoad(false);
      form.reset();
      toast.success("Updated Successfully !!!");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  async function onSubmit(values) {
    console.log("Clicked");
    setIsLoad(true);
    try {
      values.id = data?.id;
      const urls = await imageToUrl(imageFile);
      if (urls) {
        values.image = urls?.originalUrl;
      } else {
        toast.error("Unable To Upload Image !!!");
      }
      updateData(values);
    } catch (e) {
      setIsLoad(false);
      console.error("Error submitting form:", e);
    }
  }

  return (
    <>
      <Dialog open={openBox} onOpenChange={setOpenBox}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black  text-white px-3
    py-5   rounded-sm hover:bg-textColor hover:contrast-200 sm:space-x-3 sm:px-4  hover:text-white flex"
          >
            <span className="block">Edit</span>
            <EditIcon />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[500px] max-h-[80%] overflow-y-auto "
          onPointerDownOutside={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-textColor font-semibold ">
              Edit client
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
              <div className="grid  space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="">
                  <div className="space-y-2">
                    <Label htmlFor="image">image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>

                  {imagePreview && (
                    <div className="mt-2 relative w-full sm:h-[150px] h-[100px]">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        style={{ objectFit: "cover" }}
                        className="rounded-md"
                      />
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {types.map((type) => {
                            return (
                              <SelectItem
                                value={type.id.toString()}
                                key={type.id}
                              >
                                {type.title}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="flex sm:justify-center ">
                {isLoad ? (
                  <Button
                    disabled={true}
                    type="submit"
                    className="bg-black flex  items-center justify-center"
                  >
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
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-black hover:bg-textColor hover:contrast-200 cursor-pointer px-6"
                  >
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
