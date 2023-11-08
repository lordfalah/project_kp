"use client";

import FormModal from "@/components/dashboard/FormModal";
import { useEdgeStore } from "@/libs/edgestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const form = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  const onChanges = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { title, description, price } = form;

    try {
      if (file && title && description && price) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            setProgress(progress);
          },
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
              url: res?.url || "",
              size: res?.size || 0,
            },
          }),
        });

        const response = await req.json();
        return response;
      }
    } catch (error) {
      console.log({ error });
      return error;
    } finally {
      setFile(null);
      setProgress(0);
    }
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
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
    ></FormModal>
  );
};

export default form;
