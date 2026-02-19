import { UseMutationResult } from "@tanstack/react-query";
import {
  CreateKindergartenDTO,
  KindergartenDTO,
  UpdateKindergartenDTO,
} from "api/kindergarten.type";

export const handleCreateKitaSubmit = (
  createKindergarten: UseMutationResult<
    KindergartenDTO,
    unknown,
    CreateKindergartenDTO,
    unknown
  >,
  onAddKindergarten?: (kindergarten: KindergartenDTO) => void,
) => {
  return (data: CreateKindergartenDTO) => {
    createKindergarten.mutate(data, {
      onSuccess: (newKita) => {
        if (onAddKindergarten) onAddKindergarten(newKita);
      },
    });
  };
};

export const handleUpdateKitaSubmit =
  (
    updateMutation: UseMutationResult<
      KindergartenDTO,
      unknown,
      { uuid: string; data: UpdateKindergartenDTO },
      unknown
    >,
    onSuccess?: () => void,
  ) =>
  (uuid: string, data: UpdateKindergartenDTO) => {
    updateMutation.mutate(
      { uuid, data },
      {
        onSuccess: () => {
          if (onSuccess) onSuccess();
        },
      },
    );
  };
