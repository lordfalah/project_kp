"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatRupiah } from "@/utils/format";
import Trash from "@/assets/icon/Trash";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const deleteOrder = async (id) => {
  try {
    const req = await fetch(`/api/order/${id}`, { method: "DELETE" });
    if (!req.ok) throw new Error(req?.statusText || "");

    const res = await req.json();
    return res;
  } catch (error) {
    throw new Error(error?.message || "");
  }
};

const onUpdateStatus = async ({ status, id }) => {
  try {
    const req = await fetch(`/api/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    });

    if (!req.ok) throw new Error(req?.statusText || "");

    const res = await req.json();
    return res;
  } catch (error) {
    throw new Error(error?.message || "");
  }
};

export const columnsDashboard = [
  {
    header: "No",
    cell: ({ row }) => <span className="font-medium">{row?.index + 1}</span>,
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-4">
          <Image
            width={150}
            height={150}
            src={row?.original?.user?.image}
            alt={row?.original?.user?.name}
            className="w-8 h-8 aspect-square rounded-full"
            style={{ objectFit: "cover" }}
          />

          <span>{row?.original?.user?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          Rp. {formatRupiah(row.getValue("price"))}
        </span>
      );
    },
  },

  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {row
            ?.getValue("products")
            ?.map((product) => product.title)
            .join(" ")}
        </span>
      );
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { toast } = useToast();
      const queryClient = useQueryClient();
      const { mutate } = useMutation({
        mutationFn: deleteOrder,
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: ["orders"] });
          const previousOrders = queryClient.getQueryData(["orders"]);

          queryClient.setQueryData(["orders"], () =>
            previousOrders.filter((posts) => posts?.id !== id)
          );

          return { previousOrders };
        },

        onError: (err, newTodo, context) => {
          queryClient.setQueryData("orders", context.previousOrders);
        },
        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
      });

      return (
        <div className="flex gap-x-4">
          <Select
            onValueChange={async (status) => {
              try {
                await onUpdateStatus({
                  status,
                  id: row?.original?.id,
                  toast,
                });
                toast({
                  title: "Success",
                  description: "Status Order berhasil di update",
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
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={row?.getValue("status")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DONE">DONE</SelectItem>
              <SelectItem value="PROCESS">PROCESS</SelectItem>
            </SelectContent>
          </Select>

          <button
            type="button"
            onClick={async () => {
              try {
                mutate(row?.original?.id);
                toast({
                  title: "Success",
                  description: "Data Order berhasil di hapus",
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
