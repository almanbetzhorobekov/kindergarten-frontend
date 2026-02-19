import { UpdateChildDTO } from "api/child.type";
import { ChildDTO } from "api/child.type";
import { KindergartenDTO } from "api/kindergarten.type";
import { GroupDTO } from "api/group.type";

export function mapFormToUpdateChild(
  data: ChildEditFormValues,
): UpdateChildDTO {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    birthday: data.birthday,
    groupId: data.groupId,
  };
}

export type ChildEditFormValues = {
  firstName: string;
  lastName: string;
  birthday: string | null;
  kindergartenId: string;
  groupId: string;
};

export type ChildEditFormProps = {
  child: ChildDTO;
  groups: GroupDTO[];
  kindergartens: KindergartenDTO[];
  onSave: (uuid: string, data: UpdateChildDTO) => void;
  onCancel: () => void;
};
