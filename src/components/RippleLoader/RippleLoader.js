import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    "& .ripple-loader": {
      position: "relative",
      width: "64px",
      height: "64px",
      "& > div": {
        position: "absolute",
        border: `3px solid ${theme.palette.primary.main}`,
        borderRadius: "50%",
        animation: `$rippleLoader 1.2s ease-out infinite`,
        "&:nth-child(2)": {
          animationDelay: "-0.7s",
        },
      },
    },
  },
  "@keyframes rippleLoader": {
    "0%": {
      top: "32px",
      left: "32px",
      width: "0",
      height: "0",
      opacity: "1",
    },
    "100%": {
      top: "0",
      left: "0",
      width: "64px",
      height: "64px",
      opacity: "0",
    },
  },

  coverRightContent: {
    height: "100vh",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 9,
  },
}));

export default function RippleLoader({
  show = false,
  coverRightContent,
  className,
}) {
  const classes = useStyles();

  if (!show) {
    return null;
  }
  return (
    <div
      className={`${classes.container}  ${
        coverRightContent ? classes.coverRightContent : ""
      } ripple-loader-wrapper ${className}`}
    >
      <div className="ripple-loader">
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
