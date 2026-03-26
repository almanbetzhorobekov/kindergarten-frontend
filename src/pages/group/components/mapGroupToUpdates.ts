import { UpdateGroupDTO } from "api/group.type";

export type GroupEditFormValues = {
  groupName: string;
  kindergartenId: string;
  educatorId: string;
};

export type GroupEditFormProps = {
  group: {
    uuid: string;
    groupName: string;
    kindergartenId: string;
    educatorId: string;
  };
  kindergartens: { uuid: string; name: string }[];
  educators: { uuid: string; name: string }[];
  onSave: (uuid: string, data: UpdateGroupDTO) => void;
  onCancel: () => void;
};

export function mapFormToUpdateGroup(
  data: GroupEditFormValues,
): UpdateGroupDTO {
  return {
    groupName: data.groupName,
    kindergartenId: data.kindergartenId,
    educatorId: data.educatorId,
  };
}
