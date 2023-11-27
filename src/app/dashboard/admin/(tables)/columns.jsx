"use client";

import Edit from "@/assets/icon/Edit";
import Trash from "@/assets/icon/Trash";
import { SpringModal } from "@/components/Modal";
import { useEdgeStore } from "@/libs/edgestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormEdit from "./formEdit";
import { NavigateOpen } from "@/utils/hooks/useOpenNav";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

const deleteProduct = async (id) => {
  try {
    const req = await fetch(`/api/products/${id}`, { method: "DELETE" });
    const res = await req.json();

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const onUpdateRole = async ({ role, id }) => {
  try {
    const req = await fetch(`/api/account/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        role,
      }),
    });

    if (!req.ok) {
      throw new Error("Network response was not ok");
    }

    return res;
  } catch (error) {
    console.log(error);
    return error;
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

export const columnsAdmin = [
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
    header: "Image",
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
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const { data: session } = useSession();
      const role = session?.token?.role.toUpperCase();

      return (
        <Fragment>
          {role === "SUPER ADMIN" ? (
            <Select
              onValueChange={(role) =>
                onUpdateRole({ role, id: row?.original?.id })
              }
            >
              <SelectTrigger className="w-[140px] !border-0 !ring-0">
                <SelectValue placeholder={`${row?.original?.role}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="USER">USER</SelectItem>
                  <SelectItem value="ADMIN">ADMIN</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <div>{row?.original?.role}</div>
          )}
        </Fragment>
      );
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
