const CLOUD_NAME = "dzlssgfz9";
const UPLOAD_PRESET = "nehaporto";
const BASE_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}`;

export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

export function isVideo(file: File) {
  return file.type.startsWith("video/");
}

export function validateFile(file: File): string | null {
  const video = isVideo(file);
  if (video && file.size > MAX_VIDEO_BYTES) return "Video must be smaller than 100MB.";
  if (!video && file.size > MAX_IMAGE_BYTES) return "Image must be smaller than 10MB.";
  if (!video && !file.type.startsWith("image/") && file.type !== "application/pdf") {
    return "Unsupported file type.";
  }
  return null;
}

/** Uploads a file to Cloudinary and resolves with the secure URL. */
export function uploadToCloudinary(file: File, onProgress?: (pct: number) => void) {
  const resourceType = isVideo(file) ? "video" : file.type === "application/pdf" ? "raw" : "image";
  const endpoint = `${BASE_URL}/${resourceType}/upload`;

  return new Promise<string>((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText).secure_url as string);
        } catch {
          reject(new Error("Unexpected Cloudinary response"));
        }
      } else {
        reject(new Error("Cloudinary upload failed"));
      }
    };
    xhr.onerror = () => reject(new Error("Cloudinary upload failed"));
    xhr.send(formData);
  });
}

/** Adds Cloudinary auto-optimisation params to a delivery URL. */
export function optimizedImage(url: string, width = 900) {
  if (!url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}
