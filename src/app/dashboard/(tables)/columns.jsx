"use client";

import Edit from "@/assets/icon/Edit";
import Trash from "@/assets/icon/Trash";
import { SpringModal } from "@/components/Modal";
import { useEdgeStore } from "@/libs/edgestore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import FormEdit from "./formEdit";
import { NavigateOpen } from "@/utils/hooks/useOpenNav";

const deleteProduct = async (id) => {
  try {
    const req = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const res = await req.json();

    return res;
  } catch (error) {
    console.log(error);
  }
};

// const getProduct = async (id) => {
//   try {
//     const req = await fetch(`/api/products/${id}`, { method: "GET" });
//     const res = await req.json();

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const columns = [
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

        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
        },
      });

      return (
        <div className="flex gap-x-4">
          <NavigateOpen>
            <Edit row={row} />
            <SpringModal>
              <FormEdit data={row?.original} />
            </SpringModal>
          </NavigateOpen>

          <button
            type="button"
            onClick={async () => {
              try {
                mutation.mutate(row?.original?.id);
                await edgestore.publicFiles.delete({
                  url: row?.original?.imageUrls[0]?.url,
                });
              } catch (error) {
                console.log(error);
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
