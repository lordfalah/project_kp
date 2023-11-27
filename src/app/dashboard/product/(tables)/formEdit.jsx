"use client";

import FormModal from "@/components/dashboard/FormModal";
import { useEdgeStore } from "@/libs/edgestore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

const FormEdit = ({ data }) => {
  const [form, setForm] = useState({
    title: data?.title || "",
    description: data?.description || "",
    price: data?.price || "",
  });

  const [file, setFile] = useState(data?.imageUrls[0]?.url || null);
  const [progress, setProgress] = useState(100);

  const { edgestore } = useEdgeStore();

  const onChanges = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = async (file) => {
    setFile(file);
    if (file) {
      setProgress(100);
    } else {
      setProgress(0);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { title, description, price } = form;

    try {
      if (title && description && price) {
        let newFile = null;

        // Pengecekan objek
        if (typeof file === "object" && file !== null && !Array.isArray(file)) {
          const res = await edgestore.publicFiles.upload({
            file,
            options: {
              replaceTargetUrl: data?.imageUrls[0]?.url,
            },
            onProgressChange: (progress) => {
              // you can use this to show a progress bar
              setProgress(progress);
            },
          });

          newFile = {
            url: res?.url,
            size: res?.size,
          };
        }

        // you can run some server action or api here
        // to add the necessary data to your database

        const req = await fetch(`/api/products/${data?.id}`, {
          method: "PUT",
          body: JSON.stringify({
            title,
            description,
            price,
            files: {
              ...(newFile
                ? { ...newFile }
                : {
                    url: data?.imageUrls[0]?.url,
                    size: data?.imageUrls[0]?.size,
                  }),
            },
            slug: data?.catSlug,
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

      queryClient.setQueryData(["products"], (prev) => {
        const updatedProducts = [...prev];
        const idx = prev.findIndex((p) => p.id === data?.id);
        updatedProducts[idx] = data;

        return updatedProducts;
      });
      return data;
    },

    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["products"], context.previousProducts);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return (
    <FormModal
      title={"Edit Product"}
      method={"PUT"}
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

export default FormEdit;
