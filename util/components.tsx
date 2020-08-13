import { styled, Link as _Link } from "@material-ui/core";

export const Link = styled(_Link)(({ theme }) => ({
  fontSize: "2em",
  fontWeight: "lighter",
  cursor: "pointer",
  color: theme.palette.primary.main,
}));

export const Divide = styled("span")(({ theme }) => ({
  fontSize: "2em",
  fontWeight: "lighter",
  padding: 10,
  color: theme.palette.primary.main,
}));
