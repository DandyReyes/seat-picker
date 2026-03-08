import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Seat from "../app/components/Seat";

const meta = {
  title: "Components/Seat",
  component: Seat,
  tags: ["autodocs"],
} satisfies Meta<typeof Seat>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 0,
    dataIndex: "row1:0:0",
  },
};
