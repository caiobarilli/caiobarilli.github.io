import { Theme } from '@/styles/myTheme'
import {
  defaultPallet,
  aditionalPallet,
  transparentPallet,
  printPallet,
} from '@/styles/pallets'

export const defaultTheme: Theme = {
  grid: {
    container: '70rem',
    containerLarge: '100rem',
    containerExtraLarge: '90%',
    gutter: '3.2rem',
  },

  border: {
    radius: '0.4rem',
    rounded: '8rem',
  },

  font: {
    family:
      "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    medium: 500,
    bold: 600,
    sizes: {
      xxxsmall: '.55rem',
      xxsmall: '1rem',
      xsmall: '1.2rem',
      small: '1.45rem',
      medium: '2.5rem',
      large: '3.5rem',
      xlarge: '4.0rem',
      xxlarge: '4.5rem',
      xxxlarge: '5.5rem',
    },
  },

  print: {
    colors: {
      black: printPallet.colors.black,
      white: printPallet.colors.white,
    },
  },

  colors: {
    text: defaultPallet.colors.one,
    secondText: defaultPallet.colors.one,
    thirdText: defaultPallet.colors.one,
    background: defaultPallet.colors.eight,
    textMenu: defaultPallet.colors.one,
    backgroundMenu: defaultPallet.colors.eight,
    borderMenuItem: transparentPallet.colors.one,
    svgBtnMenuEffect: transparentPallet.colors.six,
    backgroundBtnMenu: defaultPallet.colors.eight,
    svgBtnMenu: defaultPallet.colors.eight,
    buttonPillBackground: defaultPallet.colors.eight,
  },

  spacings: {
    xxxsmall: '0.5rem',
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem',
  },

  layers: {
    base: 10,
    overlay: 30,
  },
}

export const darkTheme: Theme = {
  ...defaultTheme,

  colors: {
    text: defaultPallet.colors.eight,
    secondText: defaultPallet.colors.seven,
    thirdText: defaultPallet.colors.six,
    background: defaultPallet.colors.one,
    textMenu: defaultPallet.colors.eight,
    backgroundMenu: defaultPallet.colors.two,
    borderMenuItem: transparentPallet.colors.one,
    backgroundBtnMenu: defaultPallet.colors.three,
    svgBtnMenuEffect: transparentPallet.colors.one,
    svgBtnMenu: defaultPallet.colors.eight,
    buttonPillBackground: defaultPallet.colors.two,
  },
}

export const lightTheme: Theme = {
  ...defaultTheme,

  colors: {
    text: aditionalPallet.colors.one,
    secondText: aditionalPallet.colors.two,
    thirdText: aditionalPallet.colors.three,
    background: defaultPallet.colors.eight,
    textMenu: aditionalPallet.colors.five,
    backgroundMenu: aditionalPallet.colors.four,
    borderMenuItem: transparentPallet.colors.two,
    backgroundBtnMenu: aditionalPallet.colors.three,
    svgBtnMenuEffect: transparentPallet.colors.four,
    svgBtnMenu: aditionalPallet.colors.four,
    buttonPillBackground: aditionalPallet.colors.four,
  },
}
