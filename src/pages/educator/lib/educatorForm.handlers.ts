import { UseMutationResult } from "@tanstack/react-query";
import { CreateEducatorDTO, EducatorDTO } from "api/educator.type";

export const handleCreateEducatorSubmit = (
  createEducator: UseMutationResult<
    EducatorDTO,
    unknown,
    CreateEducatorDTO,
    unknown
  >,
  onAddEducator?: (educator: EducatorDTO) => void,
) => {
  return (formData: any) => {
    const payload: CreateEducatorDTO = {
      ...formData,
      groupIds: formData.groupID ? [formData.groupID] : [],
    };

    createEducator.mutate(payload, {
      onSuccess: (newEducator) => {
        if (onAddEducator) onAddEducator(newEducator);
      },
    });
  };
};
