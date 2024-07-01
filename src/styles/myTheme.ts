export interface Theme {
  grid: {
    container: string
    containerLarge: string
    containerExtraLarge: string
    gutter: string
  }

  border: {
    radius: string
    rounded: string
  }

  font: {
    family: string
    light: number
    medium: number
    normal: number
    bold: number
    sizes: {
      xxxsmall: string
      xxsmall: string
      xsmall: string
      small: string
      medium: string
      large: string
      xlarge: string
      xxlarge: string
      xxxlarge: string
    }
  }

  spacings: {
    xxxsmall: string
    xxsmall: string
    xsmall: string
    small: string
    medium: string
    large: string
    xlarge: string
    xxlarge: string
  }

  layers: {
    base: number
    overlay: number
  }

  print: {
    colors: {
      black: string
      white: string
    }
  }

  colors: {
    text: string
    secondText: string
    thirdText: string
    background: string
    textMenu: string
    backgroundMenu: string
    borderMenuItem: string
    backgroundBtnMenu: string
    svgBtnMenu: string
    svgBtnMenuEffect: string
    buttonPillBackground: string
  }
}
