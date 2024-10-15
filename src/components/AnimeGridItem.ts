import styled from "@emotion/styled";

export const AnimeGridItem = styled.div({
  backgroundColor: "#ffffff",
  borderRadius: 8,
  overflow: "hidden",
  textAlign: "center",
  boxShadow: "0 0 8px rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  paddingBottom: 8,
  position: "relative",
  transition: "box-shadow 0.2s",
  "&:hover": { boxShadow: "0 0 12px rgba(0, 0, 0, 0.5)" },
  img: {
    maxWidth: "100%",
    height: "auto",
  },
  h3: {
    fontSize: "18px",
    margin: 0,
  },
  p: {
    fontSize: "12px",
    margin: 0,
  },
});
