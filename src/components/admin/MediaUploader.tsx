import { Loader2, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { uploadToCloudinary, validateFile } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";

export function MediaUploader({
  value,
  onUpload,
  accept = "image/*",
  label = "Upload media",
}: {
  value?: string;
  onUpload: (url: string) => void;
  accept?: string;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    const error = validateFile(file);
    if (error) return toast.error(error);
    setProgress(0);
    try {
      const url = await uploadToCloudinary(file, setProgress);
      onUpload(url);
      toast.success("Upload complete");
    } catch {
      toast.error("Upload failed — check the Cloudinary preset.");
    } finally {
      setProgress(null);
    }
  };

  const isVideoUrl = value ? /\.(mp4|webm|mov)(\?|$)/i.test(value) : false;

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handleFile(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center text-sm transition-colors",
          dragging ? "border-primary bg-primary/5" : "border-border bg-secondary/50",
        )}
      >
        {progress === null ? (
          <>
            <UploadCloud className="size-6 text-primary" aria-hidden />
            <span className="text-text-secondary">{label}</span>
            <span className="text-xs text-muted-foreground">
              Drag &amp; drop or click — images up to 10MB, video up to 100MB
            </span>
          </>
        ) : (
          <>
            <Loader2 className="size-6 animate-spin text-primary" aria-hidden />
            <span className="text-text-secondary">Uploading… {progress}%</span>
            <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-border">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />
      </div>

      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
          {isVideoUrl ? (
            <video src={value} className="h-16 w-24 rounded-lg object-cover" controls />
          ) : (
            <img src={value} alt="Uploaded preview" className="h-16 w-24 rounded-lg object-cover" />
          )}
          <span className="flex-1 truncate text-xs text-muted-foreground">{value}</span>
          <button
            type="button"
            onClick={() => onUpload("")}
            aria-label="Remove media"
            className="inline-flex size-8 items-center justify-center rounded-full border border-border text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
