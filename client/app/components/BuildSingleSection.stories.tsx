import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import BuildSingleSection from "./BuildSingleSection";
import { sectionsLayout } from "../sectionsLayout";

const meta = {
  component: BuildSingleSection,
  tags: ["autodocs"],
  args: {
    layout: sectionsLayout.door1.rows,
  },
} satisfies Meta<typeof BuildSingleSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
