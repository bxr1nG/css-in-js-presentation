import styled from "@emotion/styled";

type StatusBarProps = {
  status: 1 | 2 | 3 | 4;
};

const statusColors = [
  "rgba(69, 112, 206, 0.7)",
  "rgba(83, 206, 69, 0.7)",
  "rgba(206, 69, 69, 0.7)",
  "rgba(156, 69, 206, 0.7)",
];

export const StatusBar = styled.div<StatusBarProps>((props) => ({
  position: "absolute",
  top: "0",
  width: "100%",
  textAlign: "center",
  padding: "4px",
  color: "#fff",
  backgroundColor: statusColors[props.status - 1],
}));
