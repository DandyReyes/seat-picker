import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import Seat from "./Seat";

const meta = {
  component: Seat,
} satisfies Meta<typeof Seat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 0,
    dataIndex: "dataIndex",
  },
};
