import type { Meta, StoryObj } from "@storybook/react";
import { KidCard } from "./KidCard";

const meta = {
  title: "Components/KidCard",
  component: KidCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof KidCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "Robert",
    age: 5,
    group: "Juniors",
    isPresent: true,
  },
};

export const Absent: Story = {
  args: {
    ...Default.args,
    name: "Julia",
    isPresent: false,
  },
};

export const Ferien: Story = {
  args: {
    ...Default.args,
    name: "Jonas",
    isPresent: false,
  },
};
