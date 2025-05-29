export const handleExport = async (
  url: string,
  headers: {
    "Content-Type": string;
    Accept: string;
    Authorization: string;
  }
) => {
  // process.env.NEXT_PUBLIC_BACKEND_URL_TXS +
  const fileUrl = url;
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + fileUrl, {
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the file");
    }

    // console.log(response);
    // return;
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    // link.download = `${""}.${url?.split(".")?.pop()}`; // Specify the filename
    document.body.appendChild(link);
    link.click();

    // Clean up resources
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the file:", error);
  }
};
