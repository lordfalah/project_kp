"use client";

import { SingleImageDropzone } from "../uploads/SingleImageDropzone";

const FormModal = ({
  title,
  method,
  progress,
  onChanges,
  submitForm,
  form,
  file,
  setFile,
}) => {
  return (
    <form onSubmit={submitForm} method={method}>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col items-center gap-y-4">
          <h4 className="text-black text-3xl !place-self-start">{title}</h4>
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

        <div className="">
          <label htmlFor="title" className="h-full text-black">
            <span className="text-lg font-medium">Title</span>
            <input
              required
              onChange={onChanges}
              value={form.title}
              name="title"
              id="title"
              placeholder="Title"
              className="placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 ring-offset-current ring-offset-1 focus:ring-black/25"
            />
          </label>

          <label htmlFor="price">
            <span className="text-lg font-medium text-black">Price</span>
            <input
              required
              type="number"
              onChange={onChanges}
              value={form.price}
              name="price"
              id="price"
              placeholder="Price"
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 ring-offset-current ring-offset-1 focus:ring-black/25"
            />
          </label>

          <label htmlFor="description">
            <span className="text-lg font-medium text-black">Description</span>
            <textarea
              required
              onChange={onChanges}
              value={form.description}
              name="description"
              id="description"
              className="description bg-gray-100 sec p-3 h-60 border border-gray-300 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-l focus:bg-white focus:outline-none focus:ring-1 ring-offset-current ring-offset-1 focus:ring-black/25"
              spellCheck="false"
              placeholder="Describe everything about this post here"
            ></textarea>
          </label>
        </div>

        <hr className="mt-4" />
        <div className="flex flex-row-reverse">
          <div className="flex-initial pl-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-blue-500 font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
            >
              <span className="pl-2 mx-1">Save</span>
            </button>
          </div>
          <div className="flex-initial">
            <button
              type="button"
              className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
            >
              <span className="pl-2 mx-1">Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormModal;
