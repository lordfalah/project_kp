"use client";

import Trash from "@/assets/icon/Trash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { clientApi } from "@/libs/server/action";
import { formatRupiah } from "@/utils/format";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const columnsHistory = [
  {
    header: "No",
    cell: ({ row }) => <span className="font-medium">{row?.index + 1}</span>,
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "image",
    header: "Profile",
    cell: ({ row }) => {
      return (
        <Image
          width={150}
          height={150}
          src={row?.original?.image}
          alt={row?.original?.name}
          className="w-8 h-8 aspect-square rounded-full"
          style={{ objectFit: "cover" }}
        />
      );
    },
  },

  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          {row.getValue("products")?.map(
            (product, idx) =>
              console.log(product) || (
                <div key={idx}>
                  - {product?.title} ({product?.quantity})
                </div>
              )
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return <span>Rp {formatRupiah(row.getValue("price"))}</span>;
    },
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

      const { mutate: deleteMutate } = useMutation({
        mutationFn: clientApi.deleteHistory,
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: ["historys"] });
          const previousHistorys = queryClient.getQueryData(["historys"]);

          queryClient.setQueryData(["historys"], () =>
            previousHistorys.filter((posts) => posts?.id !== id)
          );

          return { previousHistorys };
        },

        onSuccess: () => {
          toast({
            variant: "success",
            title: "Success",
            description: "Data Product berhasil di hapus",
          });
        },

        onError: (err, newTodo, context) => {
          queryClient.setQueryData("historys", context.previousHistorys);
          queryClient.invalidateQueries({ queryKey: ["historys"] });
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              err?.message || "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        },
      });

      return (
        <div className="flex gap-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <button type="button">
                <Trash />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  Are you sure want to delete this history order?
                </DialogTitle>
                <DialogDescription>
                  This will delete this history order permanently. You cannot
                  undo this action.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <button
                    className="text-white bg-red-500 w-40 py-3 rounded-md font-semibold"
                    type="button"
                    onClick={() => deleteMutate(row?.original?.id)}
                  >
                    Delete
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];
