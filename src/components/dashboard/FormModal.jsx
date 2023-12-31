"use client";

import { useContext } from "react";
import { Input } from "../ui/input";
import { SingleImageDropzone } from "../uploads/SingleImageDropzone";
import { OpenNav } from "@/utils/hooks/useOpenNav";
import { DialogClose, DialogFooter } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function checkObjectValidity(obj) {
  return Boolean(
    obj.progress === 100 && obj.title && obj.description && obj.price
  );
}

const FormModal = ({
  title,
  method,
  progress,
  onChanges,
  submitForm,
  form,
  setForm,
  file,
  onChangeFile,
}) => {
  const { setIsOpen } = useContext(OpenNav);

  return (
    <form onSubmit={submitForm} method={method}>
      <div>
        <div className="flex flex-col items-center gap-y-4">
          {/* <h4 className="text-black text-3xl !place-self-start">{title}</h4> */}
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            dropzoneOptions={{
              maxSize: 1024 * 1024 * 4, //4mb
            }}
            onChange={onChangeFile}
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
            <Input
              required
              onChange={onChanges}
              value={form.title}
              name="title"
              id="title"
              placeholder="Title"
            />
          </label>
          <div className="flex items-center justify-between gap-x-4 sm:gap-x-0">
            <label htmlFor="price">
              <span className="text-lg font-medium text-black">Price</span>
              <Input
                required
                type="number"
                onChange={onChanges}
                value={form.price}
                name="price"
                id="price"
                placeholder="Price"
              />
            </label>

            <label htmlFor="category">
              <span id="category" className="text-lg font-medium text-black">
                Category
              </span>
              <Select
                value={form?.category}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-40 md:w-[180px]">
                  <SelectValue placeholder="select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="makanan">Makanan</SelectItem>
                    <SelectItem value="minuman">Minuman</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
          </div>

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

        <div className="flex flex-row-reverse mt-3">
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <button
                disabled={!checkObjectValidity({ ...form, progress })}
                onClick={() => setIsOpen(false)}
                type="submit"
                className={`bg-gradient-to-r from-violet-600 to-blue-500 font-medium w-32 py-2.5 rounded ${
                  !checkObjectValidity({ ...form, progress })
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:opacity-90 transition-opacity"
                }`}
              >
                <span className="text-white">Save</span>
              </button>
            </DialogClose>
          </DialogFooter>
        </div>
      </div>
    </form>
  );
};

export default FormModal;
