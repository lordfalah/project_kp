"use client";

import { SingleImageDropzone } from "@/components/uploads/SingleImageDropzone";
import { useEdgeStore } from "@/libs/edgestore";
import { useState } from "react";

export default function SingleImageDropzoneUsage() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  return (
    <div className="flex flex-col items-center min-h-screen bg-black">
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
              className="h-full bg-white transition-all duration-150"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          className={`bg-white text-black text-sm px-5 py-2 rounded-md ${
            file ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={file ? false : true}
          onClick={async () => {
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
                console.log({ res });
              }
            } catch (error) {
              console.log({ error });
            } finally {
              setFile(null);
              setProgress(0);
            }
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
