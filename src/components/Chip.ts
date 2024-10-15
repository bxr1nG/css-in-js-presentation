import styled from "@emotion/styled";

type ChipProps = {
  position?: {
    x?: "left" | "right";
    y?: "top" | "bottom";
  };
};

export const Chip = styled.div<ChipProps>((props) => {
  const x = props?.position?.x === "right" ? { right: 8 } : { left: 8 };
  const y = props?.position?.y === "bottom" ? { bottom: 8 } : { top: 8 };

  return {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 4,
    top: 8,
    ...x,
    ...y,
  };
});
