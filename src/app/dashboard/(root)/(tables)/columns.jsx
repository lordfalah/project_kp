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
import { clientApi } from "@/libs/server/action";

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
            src={row?.original?.image}
            alt={row?.original?.name}
            className="w-8 h-8 aspect-square rounded-full"
            style={{ objectFit: "cover" }}
          />

          <span>{row?.original?.name}</span>
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
    header: "Price",
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          Rp. {formatRupiah(row?.original?.order?.price)}
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
          {row?.original?.order?.products
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
      const { mutateAsync: deleteMutate } = useMutation({
        mutationFn: clientApi.deleteOrder,
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
          queryClient.invalidateQueries({ queryKey: ["historys"] });
        },
      });

      return (
        <div className="flex gap-x-4">
          <Select
            onValueChange={async (status) => {
              try {
                await clientApi.onUpdateStatus({
                  status,
                  id: row?.original?.order?.id,
                });
                toast({
                  variant: "success",
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
              <SelectValue placeholder={row?.original?.order?.status} />
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
                await deleteMutate(row?.original?.order?.id);
                toast({
                  variant: "success",
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
