import base from "@coop-super-app/tailwind-config/tailwind-config";
import type { Config } from "tailwindcss";

export default {
  ...base,
  content: [
    ...base.content,
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/lib/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [...base.plugins],
} satisfies Config;
