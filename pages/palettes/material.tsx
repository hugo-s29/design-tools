import { NextPage } from "next";
import {
  Container,
  Box,
  Typography,
  colors as _colors,
  Grid,
} from "@material-ui/core";
import { FC } from "react";
import Clipboard from "react-clipboard.js";
import { Link, Divide } from "../../util/components";

type IColor = typeof _colors.red;

interface IColorList {
  [key: string]: IColor;
}

function divide<T extends {}>(arr: T[], i: number): T[][] {
  const res = [];

  let k = 0;
  for (const e of arr) {
    const a = Math.floor((i * k) / arr.length);
    if (!res[a]) res[a] = [e];
    else res[a].push(e);
    k++;
  }

  return res;
}

interface ColorProps {
  variantName: string;
  color: string;
}

const Color: FC<ColorProps> = ({ variantName, color }) => (
  <Typography
    variant="body1"
    component="p"
    style={{
      color: getColor(variantName),
      background: color,
    }}
  >
    <Clipboard
      data-clipboard-text={color}
      style={{
        color: getColor(variantName),
        background: color,
        border: "none",
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      <span>{variantName}</span>
      <span>{color}</span>
    </Clipboard>
  </Typography>
);

const colors = (_colors as unknown) as IColorList;

function getColor(n: string) {
  let num = parseInt(n.startsWith("A") ? n.split("A")[1] : n);

  if (n.startsWith("A")) {
    if (num < 300) {
      return colors.grey[900];
    } else {
      return colors.grey[50];
    }
  }

  if (num < 500) {
    return colors.grey[900];
  } else {
    return colors.grey[50];
  }
}

function getName(name: string) {
  const result = name.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}

const HomePage: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography variant="h2" component="h1" color="secondary">
          Design tools - Material Colors
        </Typography>
        <Link gutterBottom href="/">
          Home
        </Link>
        <Divide>-</Divide>
        <Link gutterBottom href="/palettes">
          Back
        </Link>
      </Box>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        {divide(
          Object.keys(colors).filter((f) => f !== "common"),
          2
        ).map((line) => (
          <Grid
            key={line.join("")}
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            {line.map((name) => (
              <Box
                my={2}
                key={name}
                style={{
                  width: "100%",
                  maxWidth: `${
                    180 /
                    Object.keys(colors).filter((f) => f !== "common").length
                  }vw`,
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  style={{
                    color: (colors[name] as IColor)[700],
                    textOverflow: "revert",
                  }}
                >
                  {getName(name)}
                </Typography>
                {Object.entries(colors[name]).map(([variantName, color]) => (
                  <Color {...{ variantName, color }} key={name + variantName} />
                ))}
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
