import styled from "@emotion/styled";

const breakpoints = [480, 768, 1024, 1200];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const Container = styled.div({
  maxWidth: "1200px",
  width: "100%",
  margin: "0 auto",
  padding: "10px 20px",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  [mq[0]]: {
    maxWidth: "100%",
    padding: "10px",
  },
  [mq[1]]: {
    maxWidth: "720px",
  },
  [mq[2]]: {
    maxWidth: "960px",
  },
  [mq[3]]: {
    maxWidth: "1140px",
  },
});
