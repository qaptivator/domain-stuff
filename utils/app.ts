import stream from "stream";

export function openWindow(url: string | URL) {
  if (window) window.open(url, "_blank");
}

export function notEmpty(v: any): boolean {
  return v ? true : false;
}

export async function downloadFromUrl(url: string | URL, name?: string) {
  try {
    const imageUrl = url; // URL of the image
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error("Image fetch failed");

    const imageBlob = await response.blob();

    if (!name) {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      name = pathname.split("/").pop() as string;
      //const parts = url.split('/');
      //name = parts[parts.length - 1] || 'downloaded-file';
    }

    downloadFromBlob(imageBlob, name);
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
}

export function downloadFromBlob(
  blob: Blob | MediaSource,
  name: string = "downloaded"
) {
  try {
    const localUrl = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = localUrl;
    a.download = name;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(localUrl);
  } catch (error) {
    console.error("Error downloading the image:", error);
  }
}

// source: https://www.npmjs.com/package/stream-to-blob
export function streamToBlob(stream: stream, mimeType?: string) {
  return new Promise((resolve, reject) => {
    const chunks: BlobPart[] = [];
    stream
      .on("data", (chunk) => chunks.push(chunk))
      .once("end", () => {
        const blob =
          mimeType != null
            ? new Blob(chunks, { type: mimeType })
            : new Blob(chunks);
        resolve(blob);
      })
      .once("error", reject);
  });
}
