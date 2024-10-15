import { styled } from "@mui/material/styles";
import { Chip, ChipProps } from "@mui/material";

type StatusChipProps = ChipProps & {
  status: 1 | 2 | 3 | 4;
};

const statusColors = [
  "rgba(69, 112, 206)",
  "rgba(83, 206, 69)",
  "rgba(206, 69, 69)",
  "rgba(156, 69, 206)",
];

export const StatusChip = styled(Chip)<StatusChipProps>(
  ({ status }: StatusChipProps) => ({
    position: "absolute",
    zIndex: 1,
    top: 5,
    left: 5,
    color: "#fff",
    backgroundColor: statusColors[status - 1],
  }),
);
