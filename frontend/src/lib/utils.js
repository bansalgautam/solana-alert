import { toast } from "@/components/ui/use-toast";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function toastFromResponse(toast, response) {
  toast({
    description: response.data.message,
  });
}

export async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
    toast({
      description: "Copied to clipboard",
    });
  } catch (e) {
    console.log(e);
  }
}
