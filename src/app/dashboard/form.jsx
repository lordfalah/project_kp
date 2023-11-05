"use client";

import FormModal from "@/components/dashboard/FormModal";
import { useEdgeStore } from "@/libs/edgestore";
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

        await fetch("/api/products/", {
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
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setFile(null);
      setProgress(0);
    }
  };

  return (
    <FormModal
      title={"Add Product"}
      method={"POST"}
      progress={progress}
      onChanges={onChanges}
      submitForm={submitForm}
      form={form}
      file={file}
      setFile={setFile}
    ></FormModal>
  );
};

export default form;
