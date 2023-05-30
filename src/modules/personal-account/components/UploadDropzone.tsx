import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useTranslation } from "react-i18next"

import { cn } from "@/lib/classNames"

const UploadDropzone = ({
  file,
  setFile,
  setBase64,
}: {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  setBase64: React.Dispatch<React.SetStateAction<string>>
}) => {
  const { t } = useTranslation("modals")

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      setFile(file)
      const reader = new FileReader()

      reader.onabort = () => console.log("file reading was aborted")
      reader.onerror = () => console.log("file reading has failed")
      reader.onload = () => {
        const base64file = reader.result as string
        setBase64(base64file)
      }
      reader.readAsDataURL(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  })

  return (
    <div
      className={cn(
        "group h-[60px] w-full border border-dashed border-gray-4 dark:border-gray-2 flex items-center justify-center rounded-lg cursor-pointer outline-none hover:bg-gray-6 dark:hover:bg-gray-2 dark:hover:bg-opacity-20",
        isDragActive && "border-res-bot-blue dark:border-res-bot-blue"
      )}
      {...getRootProps()}
    >
      <input
        {...getInputProps()}
        multiple={false}
        accept="image/png, image/jpeg"
        className="outline-none"
      />
      <span
        className={cn(
          "typography-tip text-gray-3 select-none text-center break-all px-1.5 group-hover:text-gray-2 dark:group-hover:text-gray-4",
          isDragActive && "text-res-bot-blue dark:text-res-bot-blue"
        )}
      >
        {file
          ? `${file.name} - ${(file.size / 1024).toFixed(2)} kB`
          : t("change-avatar.uploading-area")}
      </span>
    </div>
  )
}

export default UploadDropzone
