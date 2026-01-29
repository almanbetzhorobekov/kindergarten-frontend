import { Person } from "./person.type";

export type ChildDTO = Person & {
  uuid: string;
  parentsId: string[];
  groupId: string;
};

export type CreateChildDTO = Omit<ChildDTO, "uuid">;
export type UpdateChildDTO = Partial<Omit<ChildDTO, "uuid">>;
