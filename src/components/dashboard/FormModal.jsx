"use client";

import { useEdgeStore } from "@/libs/edgestore";
import React, { useState } from "react";
import { SingleImageDropzone } from "../uploads/SingleImageDropzone";

const FormModal = () => {
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
      if (file) {
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            // you can use this to show a progress bar
            setProgress(progress);
          },
        });

        // you can run some server action or api here
        // to add the necessary data to your database

        const submit = await fetch("/api/products/", {
          method: "POST",
          body: JSON.stringify({
            title,
            description,
            price,
            files: {
              url: res.url,
              size: res.size,
            },
          }),
        });
        console.log(submit);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setFile(null);
      setProgress(0);
    }
  };

  return (
    <form onSubmit={submitForm} method="POST">
      <div className="bg-white rounded-lg shadow">
        <div className="flex flex-col items-center">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 4, //4mb
            }}
            onChange={(file) => {
              setFile(file);
            }}
          />

          <div>
            {file && (
              <div className="h-[6px] w-44 border rounded overflow-hidden my-4">
                <div
                  className="h-full bg-black transition-all duration-150"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-5">
          <input
            onChange={onChanges}
            value={form.title}
            name="title"
            placeholder="Title"
            className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
          />
          <input
            type="number"
            onChange={onChanges}
            value={form.price}
            name="price"
            placeholder="Price"
            className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
          />

          <label htmlFor="description">
            <textarea
              onChange={onChanges}
              value={form.description}
              name="description"
              id="description"
              className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none w-full text-black"
              spellCheck="false"
              placeholder="Describe everything about this post here"
            ></textarea>
          </label>
        </div>

        <hr className="mt-4" />
        <div className="flex flex-row-reverse p-3">
          <div className="flex-initial pl-3">
            <button
              type="submit"
              className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                  opacity=".3"
                />
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
              </svg>
              <span className="pl-2 mx-1">Save</span>
            </button>
          </div>
          <div className="flex-initial">
            <button
              type="button"
              className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M8 9h8v10H8z" opacity=".3" />
                <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z" />
              </svg>
              <span className="pl-2 mx-1">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormModal;
