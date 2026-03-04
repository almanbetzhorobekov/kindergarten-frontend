import { childAPI } from "api/childService";
import { useParentsApi } from "../api/ParentsApi";

console.log("ParentsForm.test.tsx");
vi.mock("../api/ParentsApi", () => ({
  useParentsApi: vi.fn(),
}));

vi.mock("../../../api/childService", () => ({
  childAPI: {
    getAll: vi.fn().mockResolvedValue({
      content: [{ uuid: "child-1", firstName: "Sascha", lastName }],
    }),
  },
}));
