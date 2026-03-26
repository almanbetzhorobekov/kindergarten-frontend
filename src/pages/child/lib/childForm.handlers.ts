import { CreateChildDTO, ChildDTO } from "api/child.type";
import { UseMutationResult } from "@tanstack/react-query";

export const handleCreateChildSubmit = (
  createChild: UseMutationResult<ChildDTO, unknown, CreateChildDTO, unknown>,
  onAddChild?: (child: ChildDTO) => void,
) => {
  return (data: CreateChildDTO) => {
    createChild.mutate(data, {
      onSuccess: (newChild) => {
        if (onAddChild) onAddChild(newChild);
      },
    });
  };
};
