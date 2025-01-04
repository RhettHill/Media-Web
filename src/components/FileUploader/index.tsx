import * as React from "react";
import {
  FileUploaderRegular,
  OutputFileEntry,
  UploadCtxProvider,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { FileEntry } from "@/types";
import { useState } from "react";

interface IFileUploaderProps {
  fileEntry: FileEntry;
  onChange: (fileEntry: FileEntry) => void;
  preview: boolean;
}

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
  fileEntry,
  onChange,
  preview,
}) => {
  const handleRemoveClick = React.useCallback(
    (uuid: OutputFileEntry["uuid"]) =>
      onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
    [fileEntry.files, onChange]
  );

  // Updated the state initialization with OutputFileEntry<"success">[]
  const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry[] | []>(
    []
  );
  const ctxProviderRef = React.useRef<InstanceType<UploadCtxProvider>>(null);

  const resetUploaderState = () => {
    ctxProviderRef.current?.uploadCollection.clearAll();
  };

  const handleModalCloseEvent = () => {
    resetUploaderState();

    // Here you update the `onChange` with the new uploaded files
    onChange({ files: [...fileEntry.files, ...uploadedFiles] });

    setUploadedFiles([]); // Clear the uploaded files state
  };

  // Handle the change event from the FileUploaderRegular component
  const handleChangeEvent = (files: any) => {
    // Filter for files with "success" status
    const successFiles: OutputFileEntry[] = files.allEntries.filter(
      (f: OutputFileEntry) => f.status === "success"
    );
    setUploadedFiles(successFiles);
  };

  return (
    <div>
      <div>
        <FileUploaderRegular
          sourceList="local, url, camera, dropbox"
          classNameUploader="uc-purple text-white bg-slate-800 rounded p-1"
          pubkey="3a49f902ba1e5428835c"
          multiple={preview}
          confirmUpload={true}
          removeCopyright={true}
          imgOnly={true}
          onModalClose={handleModalCloseEvent}
          onChange={handleChangeEvent} // Handle file change event
        />
      </div>
      {preview ? (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {fileEntry.files.map((file) => (
            <div key={file.uuid} className="relative">
              <img
                src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
                alt={file.fileInfo?.originalFilename || ""}
              />
              <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800 rounded-full w-7 h-7">
                <button
                  className="text-slate-800 text-center"
                  type="button"
                  onClick={() => handleRemoveClick(file.uuid)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default FileUploader;
