import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPaymentStatus(s: string) {
  let status = "";
  switch (s) {
    case "pending-payment":
      status = "Pending payment";
      break;

    case "paid":
      status = "Paid";
      break;

    case "processing":
      status = "Order processing";
      break;

    case "shipped":
      status = "Order shipped";
      break;

    case "completed":
      status = "Order compeleted";
      break;

    case "cancelled":
      status = "Order cancelled";
      break;

    default:
      status = "Unknown";
      break;
  }

  return status;
}
