import { NextPage } from "next";
import { Container, Box, Typography, Grid } from "@material-ui/core";
import { FC } from "react";
import Clipboard from "react-clipboard.js";
import { Link, Divide } from "../../util/components";
import colors from "../../data/ibm.json";

type IColor = typeof colors.red;

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
      color: getColor(color),
      background: color,
    }}
  >
    <Clipboard
      data-clipboard-text={color}
      style={{
        color: getColor(color),
        background: color,
        border: "none",
        width: "100%",
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

const ignore: (keyof typeof colors)[] = ["black", "white"];
function hexToHSL(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result === null)
    return {
      h: 0,
      s: 0,
      l: 0,
    };

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  (r /= 255), (g /= 255), (b /= 255);
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }
    h /= 6;
  }
  return {
    h,
    s,
    l,
  };
}

function getColor(c: string) {
  const l = hexToHSL(c).l * 100;
  if (l <= 50) {
    return colors.gray[1];
  } else {
    return colors.gray[90];
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
          Design tools - IBM Colors
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
          Object.keys(colors).filter(
            (f) => !ignore.includes(f as keyof typeof colors)
          ),
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
                    Object.keys(colors).filter(
                      (f) => !ignore.includes(f as keyof typeof colors)
                    ).length
                  }vw`,
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  style={{
                    color: (colors[name as keyof typeof colors] as IColor)[70],
                    textOverflow: "revert",
                  }}
                >
                  {getName(name)}
                </Typography>
                {Object.entries(colors[name as keyof typeof colors]).map(
                  ([variantName, color]) => (
                    <Color
                      {...{ variantName, color }}
                      key={name + variantName}
                    />
                  )
                )}
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
