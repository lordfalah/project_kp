"use client";

import Edit from "@/assets/icon/Edit";
import Trash from "@/assets/icon/Trash";
import { useEdgeStore } from "@/libs/edgestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import FormEdit from "./formEdit";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const deleteProduct = async (id) => {
  try {
    const req = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (!req.ok) throw new Error(req?.statusText || "");
    const res = await req.json();

    return res;
  } catch (error) {
    throw new Error(error?.message || "");
  }
};

export const columnsProducts = [
  {
    header: "No",
    cell: ({ row }) => <span className="font-medium">{row?.index + 1}</span>,
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <button
          type="button"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex gap-x-1.5 items-center"
        >
          <span>Title</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "action",
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const { toast } = useToast();
      const queryClient = useQueryClient();
      const { edgestore } = useEdgeStore();

      const mutation = useMutation({
        mutationFn: deleteProduct,
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: ["products"] });
          const previousProducts = queryClient.getQueryData(["products"]);

          queryClient.setQueryData(["products"], () =>
            previousProducts.filter((posts) => posts?.id !== id)
          );

          return { previousProducts };
        },

        onError: (err, newTodo, context) => {
          queryClient.setQueryData("products", context.previousProducts);
          queryClient.invalidateQueries({ queryKey: ["products"] });
        },
      });

      return (
        <div className="flex gap-x-4">
          <Dialog>
            <DialogTrigger>
              <Edit />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <FormEdit data={row?.original} />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <button
            type="button"
            onClick={async () => {
              try {
                mutation.mutate(row?.original?.id);
                await edgestore.publicFiles.delete({
                  url: row?.original?.imageUrls[0]?.url,
                });

                console.log("SUCCESS");
                toast({
                  title: "Success",
                  description: "Data Product berhasil di hapus",
                });
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description:
                    error?.message || "There was a problem with your request.",
                  action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                  ),
                });
              }
            }}
          >
            <Trash />
          </button>
        </div>
      );
    },
  },
];
