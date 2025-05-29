import base from "@yegna-systems/tailwind-config/tailwind-config";
import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  ...base,
  content: [
    ...base.content,
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
    "../../packages/lib/src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [...base.plugins, scrollbarHide],
} satisfies Config;
