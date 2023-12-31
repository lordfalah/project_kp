"use client";

import Trash from "@/assets/icon/Trash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { clientApi } from "@/libs/server/action";

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
      const { toast } = useToast();
      const { data: session } = useSession();
      const role = session?.token?.role.toUpperCase();

      return (
        <Fragment>
          {role === "SUPER ADMIN" ? (
            <Select
              onValueChange={async (role) => {
                try {
                  await clientApi.onUpdateRole({ role, id: row?.original?.id });
                  toast({
                    variant: "success",
                    title: "Success",
                    description: "Role berhasil di edit",
                  });
                } catch (error) {
                  toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description:
                      error?.message ||
                      "There was a problem with your request.",
                    action: (
                      <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                  });
                }
              }}
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
      const { toast } = useToast();
      const queryClient = useQueryClient();

      const { mutate: deleteMutate } = useMutation({
        mutationFn: clientApi.deleteUser,
        onMutate: async (id) => {
          await queryClient.cancelQueries({ queryKey: ["users"] });
          const previousUsers = queryClient.getQueryData(["users"]);

          queryClient.setQueryData(["users"], () =>
            previousUsers.filter((user) => user?.id !== id)
          );

          return { previousUsers };
        },
        onError: (err, newTodo, context) => {
          queryClient.setQueryData("users", context.previousUsers);
          // queryClient.invalidateQueries({ queryKey: ["products"] });
        },

        // Always refetch after error or success:
        onSettled: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      });

      return (
        <div className="flex gap-x-4">
          <button
            type="button"
            onClick={() => {
              try {
                deleteMutate(row?.original?.id);
                toast({
                  variant: "success",
                  title: "Success",
                  description: "Tabel admin berhasil di hapus",
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
