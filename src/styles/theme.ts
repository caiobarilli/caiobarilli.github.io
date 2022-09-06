export default {
  grid: {
    container: '60rem',
    containerLarge: '100rem',
    gutter: '3.2rem'
  },
  border: {
    radius: '0.4rem',
    rounded: '8rem'
  },
  font: {
    family:
      "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xxsmall: '1rem',
      xsmall: '1.2rem',
      small: '1.4rem',
      medium: '1.6rem',
      large: '1.8rem',
      xlarge: '2.0rem',
      xxlarge: '2.8rem',
      xxxlarge: '5.5rem'
    }
  },
  colors: {
    primary: '#F231A5',
    secondary: '#3CD3C1',
    white: '#FAFAFA',
    black: '#171718',
    gray: '#999999',
    lightGray: '#d4d4d4',
    darkGray: '#2c2c2c'
  },
  spacings: {
    xxxsmall: '0.5rem',
    xxsmall: '0.8rem',
    xsmall: '1.6rem',
    small: '2.4rem',
    medium: '3.2rem',
    large: '4.0rem',
    xlarge: '4.8rem',
    xxlarge: '5.6rem'
  },
  layers: {
    base: 10,
    overlay: 30
  }
} as const
