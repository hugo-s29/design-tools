import { NextPage } from "next";
import { Container, Box, Typography } from "@material-ui/core";
import { Link } from "../util/components";

const HomePage: NextPage = () => (
  <Container maxWidth="md">
    <Box my={4}>
      <Typography variant="h2" component="h1" gutterBottom>
        Design tools
      </Typography>
      <Link href="/palettes" color="secondary">
        Palettes
      </Link>
    </Box>
  </Container>
);

export default HomePage;
