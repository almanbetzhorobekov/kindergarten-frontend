import type { Meta, StoryObj } from "@storybook/react";
import ChildFormView from "./ChildFormView";

const meta: Meta<typeof ChildFormView> = {
  title: "Components/ChildForm",
  component: ChildFormView,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSubmit: { action: "form-submitted" },
  },
};

export default meta;
type Story = StoryObj<typeof ChildFormView>;

const mockKindergartens = [
  { value: "k1", label: "Sonnenschein" },
  { value: "k2", label: "Regenbogen" },
  { value: "k3", label: "Sternenlicht" },
];

const mockGroups = [
  { value: "g1", label: "Elefanten" },
  { value: "g2", label: "Tiger" },
  { value: "g3", label: "Pinguine" },
];

export const Default: Story = {
  args: {
    kindergartenOptions: mockKindergartens,
    groupOptions: mockGroups,
    isPending: false,
    isError: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isPending: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    isError: true,
  },
};

export const NoKindergartenSelected: Story = {
  args: {
    ...Default.args,
    kindergartenOptions: mockKindergartens,
    groupOptions: [],
  },
};
