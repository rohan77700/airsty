'use client';

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onChange, 
  value 
}) => {
  const handleUpload = useCallback((result: any) => {
      onChange(result.info.secure_url);
    }, [onChange]);

  return (
    <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset="xre0sg7v"
    options={{
      maxFiles: 1,
    }}
    >
      {({ open }) => {
        return (
          <div
          onClick={() => open?.()}
          className="relative flex flex-col items-center justify-center hover:opacity-70 border-dashed border-2 p-20 border-neutral-300 text-neutral-600 gap-4 transition cursor-pointer">
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image 
                fill 
                style={{ objectFit: "cover" }} 
                src={value} 
                alt="Upload" 
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;