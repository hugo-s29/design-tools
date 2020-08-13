import { NextPage } from "next";
import { Container, Box, Typography, styled } from "@material-ui/core";
import { Link } from "../../util/components";

const PaletteLink = styled(Link)(() => ({
  fontSize: "1.5em",
}));

const HomePage: NextPage = () => (
  <Container maxWidth="md">
    <Box my={4}>
      <Typography variant="h2" component="h1" gutterBottom color="secondary">
        Design tools - Palettes
      </Typography>
      <Link gutterBottom href="/">
        Home
      </Link>
    </Box>
    <Box my={4}>
      <PaletteLink href="/palettes/material">Material Palette</PaletteLink>
    </Box>
    <Box my={4}>
      <PaletteLink href="/palettes/ibm">IBM Palette</PaletteLink>
    </Box>
    <Box my={4}>
      <PaletteLink href="/palettes/flat">Flat Palette</PaletteLink>
    </Box>
  </Container>
);

export default HomePage;
