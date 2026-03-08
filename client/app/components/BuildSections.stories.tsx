import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BuildSections from "./BuildSections";
import { sectionsLayout } from "../sectionsLayout";

const meta = {
  component: BuildSections,
  tags: ["autodocs"],
} satisfies Meta<typeof BuildSections>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    layout: sectionsLayout.door1,
    seats: { "door1:0:0": 1 },
    door: "door1",
    takenSeatsPerSection: { door1: 10, door2: 5, door3: 2, door4: 8 },
  },
};
