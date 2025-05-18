import { toast } from "sonner"

export const useToast = () => {
  return {
    toast,
    dismiss: toast.dismiss,
    toasts: [], // This is a placeholder, sonner handles toasts differently
  }
}
