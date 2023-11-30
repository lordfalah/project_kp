"use client";

import FormModal from "@/components/dashboard/FormModal";
import { useToast } from "@/components/ui/use-toast";
import { useEdgeStore } from "@/libs/edgestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const form = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();
  const [temp, setTemp] = useState({ url: "", size: 0 });

  // input form
  const onChanges = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // make upload tempory image
  const onChangeFile = async (file) => {
    try {
      setFile(file);
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          temporary: true,
        },
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          console.log(progress);
          setProgress(progress);
        },
      });
      setTemp({ url: res?.url, size: res?.size });
    } catch (error) {
      console.log({ error });
      setTemp({ url: "", size: 0 });
      setFile(null);
    }
  };

  // submit all to database products
  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const { title, description, price } = form;
      const { url, size } = temp;

      if (title && description && price && file) {
        // file save to edgestore
        await edgestore.publicFiles.confirmUpload({
          url,
        });

        // you can run some server action or api here
        // to add the necessary data to your database
        const req = await fetch("/api/products/", {
          method: "POST",
          body: JSON.stringify({
            title,
            description,
            price,
            files: {
              url,
              size,
            },
          }),
        });

        if (!req.ok) {
          throw new Error("Network response was not ok");
        }
        toast({
          title: "Success",
          description: "Data Product berhasil di tambah",
        });
        const response = await req.json();
        return response;
      }
    } catch (error) {
      await edgestore.publicFiles.delete({
        url: temp?.url,
      });

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message || "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return error;
    } finally {
      setFile(null);
      setProgress(0);
    }
  };

  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: submitForm,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const previousProducts = queryClient.getQueryData(["products"]);
      return { previousProducts };
    },

    onSuccess: (data, variables, context) => {
      // Optimistically update to the new value

      if (data?.message) {
        queryClient.setQueryData(["products"], context.previousProducts);
      } else {
        queryClient.setQueryData(["products"], (prev) => [...prev, data]);
      }

      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["products"], context.previousProducts);
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    mutationKey: ["addProduct"],
  });

  return (
    <FormModal
      title={"Add Product"}
      method={"POST"}
      progress={progress}
      onChanges={onChanges}
      submitForm={mutate}
      form={form}
      file={file}
      setFile={setFile}
      onChangeFile={onChangeFile}
    ></FormModal>
  );
};

export default form;
