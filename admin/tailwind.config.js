import {
  scopedPreflightStyles,
  isolateInsideOfContainer,
  isolateOutsideOfContainer,
} from "tailwindcss-scoped-preflight";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "var(--white-cl)",
      black: {
        100: "var(--black-cl-100)",
        200: "var(--black-cl-200)",
        300: "var(--black-cl-300)",
        outline: "var(--black-outline)",
      },
      purple: {
        100: "var(--purple-cl-100)",
        200: "var(--purple-cl-200)",
        300: "var(--purple-cl-300)",
      },
      blue: {
        100: "var(--blue-cl-100)",
        200: "var(--blue-cl-200)",
      },
      sky: {
        100: "var(--sky-cl-100)",
        200: "var(--sky-cl-200)",
      },
      red: {
        100: "var(--red-cl-100)",
        200: "var(--red-cl-200)",
      },
      green: {
        100: "var(--green-cl-100)",
        200: "var(--green-cl-200)",
      },
      gray: {
        100: "var(--gray-cl-100)",
        200: "var(--gray-cl-200)",
      },
      orange: {
        100: "var(--orange-cl-100)",
        200: "var(--orange-cl-200)",
      },
      "blue-light": {
        100: "var(--blue-light-cl-100)",
        200: "var(--blue-light-cl-200)",
        300: "var(--blue-light-cl-300)",
      },
    },
    fontFamily: {
      bold: "var(--ff-bold)",
      medium: "var(--ff-medium)",
      regular: "var(--ff-regular)",
      semibold: "var(--ff-semibold)",
    },
    fontSize: {
      "h1-lg": "var(--fs-h1-lg)",
      "h1-sm": "var(--fs-h1-sm)",
      h1: "var(--fs-h1)",
      h2: "var(--fs-h2)",
      "h2-sm": "var(--fs-h2-sm)",
      h3: "var(--fs-h3)",
      lg: "var(--fs-text-lg)",
      body: "var(--fs-body)",
      "body-big": "var(--fs-text-lg)",
      caption: "var(--fs-caption)",
      tag: "var(--fs-tag)",
    },
    extend: {
      maxWidth: {
        maxWidthPage: "var(--max-width-page)",
      },
      screens: {
        tablet: "834.98px",
        mobile: "608.98px",
      },
      aspectRatio: {
        hero: "var(--aspect-hero)",
        lg: "var(--aspect-lg)",
        md: "var(--aspect-md)",
        sm: "var(--aspect-sm)",
        xs: "var(--aspect-xs)",
        xxs: "var(--aspect-xxs)",
      },
      height: {
        header: "var(--header-height)",
      },
      gap: {
        default: "var(--gap)",
      },
      animation: {
        rotateUp:
          "rotateUp 0.5s both  cubic-bezier(0.970, -0.020, 0.165, 1.065)",
        rotateDown:
          "rotateDown 0.5s both  cubic-bezier(0.970, -0.020, 0.165, 1.065)",
        rotateUpLight:
          "rotateUpLight 0.5s both  cubic-bezier(0.970, -0.020, 0.165, 1.065)",
        rotateDownLight:
          "rotateDownLight 0.5s both  cubic-bezier(0.970, -0.020, 0.165, 1.065)",
      },
      keyframes: {
        rotateUp: {
          "0%": { transform: "translateY(0px)" },
          "50%": {
            transform: "translateY(-10px)",
          },
          "100%": {
            transform: "translateY(-10px) rotate(-45deg)",
            backgroundColor: "var(--white-cl)",
          },
        },
        rotateDown: {
          "0%": { transform: "translateY(0px)" },
          "50%": {
            transform: "translateY(10px)",
          },
          "100%": {
            transform: "translateY(10px) rotate(45deg)",
            backgroundColor: "var(--white-cl)",
          },
        },
        rotateUpLight: {
          "0%": { transform: "translateY(0px)" },
          "50%": {
            transform: "translateY(-10px)",
          },
          "100%": {
            transform: "translateY(-10px) rotate(-45deg)",
            backgroundColor: "var(--black-cl-200)",
          },
        },
        rotateDownLight: {
          "0%": { transform: "translateY(0px)" },
          "50%": {
            transform: "translateY(10px)",
          },
          "100%": {
            transform: "translateY(10px) rotate(45deg)",
            backgroundColor: "var(--black-cl-200)",
          },
        },
      },
    },
  },
  plugins: [
    scopedPreflightStyles({
      isolationStrategy: isolateOutsideOfContainer(".ckeditor"),
    }),
  ],
};
