export const getImagePath = (path: string): string => {
  if (typeof window === "undefined") {
    return "";
  }

  const baseUrl = path?.split("v1.0/chatbirrapi/")[1] || "";
  const { origin } = window.location;

  const domainMappings: { [key: string]: string } = {
    "https://sau-dbsa.vercel.app": "https://sau.eaglelionsystems.com",
    "https://chatbirr-app-dashboard.vercel.app":
      "https://sau.eaglelionsystems.com",
    "http://localhost:3000": "https://sau.eaglelionsystems.com",
    "https://dev-chatbirr-app-dashboard.vercel.app":
      "https://uatdev.eaglelionsystems.com",
    "https://centraldashenbanksuperapp.com":
      "https://centraldashenbanksuperapp.com",
  };

  const targetDomain = domainMappings[origin] || origin;

  return `${targetDomain}/v1.0/chatbirrapi/${baseUrl}`;
};
