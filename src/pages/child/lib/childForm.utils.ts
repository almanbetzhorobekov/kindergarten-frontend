import { GroupDTO } from "api/group.type";
import { KindergartenDTO } from "api/kindergarten.type";

export const mapKindergartensToOptions = (kindergartens: KindergartenDTO[]) =>
  kindergartens.map((k) => ({ value: k.uuid, label: k.kindergartenName }));

export const filterGroupsByKindergarten = (
  groups: GroupDTO[],
  kindergartenId: string,
) =>
  groups
    .filter((g) => g.kindergartenId === kindergartenId)
    .map((g) => ({ value: g.uuid, label: g.groupName }));

/*export const handleEdit = (child: ChildDTO) => {
  setEditChild(child);
  setOpenEdit(true);
};*/
