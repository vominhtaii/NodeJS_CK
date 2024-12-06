import { useMutation } from "@tanstack/react-query";

export const useMutationHooks = (fnCallback, options = {}) => {
    // Ensure the mutation is correctly configured and callbacks can be passed in `options`
    const mutation = useMutation({
        mutationFn: fnCallback,
        ...options, // Spread additional options like onSuccess, onError, etc.
    });

    return mutation;
};
