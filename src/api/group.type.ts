import { ChildDTO } from "./child.type";

export type GroupDTO = {
  uuid: string;
  groupName: string;
  childList: ChildDTO[];
  kindergartenId: string;
  kindergartenName: string;
  educatorId: string;
};

export type CreateGroupDTO = Omit<GroupDTO, "uuid">;
export type UpdateGroupDTO = Partial<Omit<GroupDTO, "uuid">>;
