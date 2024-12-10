import { useMutation } from "@tanstack/react-query"
export const useMutationHook = (callbackFn) =>{
    const mutation = useMutation({
      mutationFn : callbackFn
    })
      return mutation
} 