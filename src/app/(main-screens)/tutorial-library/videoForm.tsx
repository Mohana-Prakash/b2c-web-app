import React from "react";
import Input from "@/components/FormComponent/input";

interface VideoFormProps {
  mode: "add" | "edit" | null;
  videoForm: {
    videoUrl: string;
    title: string;
    description: string;
    status: string;
  };
  setVideoForm: React.Dispatch<
    React.SetStateAction<{
      videoUrl: string;
      title: string;
      description: string;
      status: string;
    }>
  >;
}

export default function VideoForm({ mode, videoForm, setVideoForm }: VideoFormProps): JSX.Element {
  return (
    <>
      <div>
        <Input
          label="Title"
          type="text"
          name="title"
          placeholder="Enter your title here..."
          value={videoForm?.title}
          onChange={(e) =>
            setVideoForm((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          isDisabled={false}
        />
      </div>
      <div className="mt-2">
        <Input
          label="URL"
          type="text"
          placeholder="Type your url here..."
          name="videoUrl"
          value={videoForm?.videoUrl}
          onChange={(e) =>
            setVideoForm((prev) => ({
              ...prev,
              videoUrl: e.target.value,
            }))
          }
          isDisabled={false}
        />
      </div>
      <div className="mt-2">
        <Input
          label="Description"
          type="textarea"
          name="description"
          placeholder="Enter your description here..."
          value={videoForm?.description}
          onChange={(e) =>
            setVideoForm((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          isDisabled={false}
        />
      </div>
      {mode === "edit" && (
        <>
          {/* <div className="flex items-center w-full my-4">
            <div className="flex-grow h-px bg-gray-400"></div>
            <span className="px-3 text-grey-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-400"></div>
          </div> */}
          <div className="mt-2">
            <p className="m-0 text-xs text-gray-700">Status</p>
            <Input
              name="faqStatusSwitch"
              type="switch"
              onChange={(e) =>
                setVideoForm((prev) => ({
                  ...prev,
                  status: (e.target as HTMLInputElement).checked ? "ACTIVE" : "IN_ACTIVE",
                }))
              }
              checked={videoForm?.status === "ACTIVE" ? true : false}
            />
            <p className="text-xs text-gray-500 mt-1">
              <span className="font-semibold">Note:</span>
              <br />
              If you set the status to <span className="font-semibold">
                Active
              </span>, user will be able to view this video.
              <br />
              If you set it to <span className="font-semibold">
                Inactive
              </span>, user will not be able to see it.
            </p>
          </div>
        </>
      )}
    </>
  );
}
