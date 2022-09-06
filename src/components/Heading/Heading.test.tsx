import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import theme from 'styles/theme'

import Heading from '.'

describe('<Heading />', () => {
  it('should render the heading', () => {
    renderWithTheme(<Heading>Reactjs Boilerplate</Heading>)
    expect(
      screen.getByRole('heading', { name: /Reactjs Boilerplate/i })
    ).toBeInTheDocument()
  })

  it('should render the small heading', () => {
    renderWithTheme(<Heading size="small">Reactjs</Heading>)
    expect(screen.getByRole('heading', { name: /Reactjs/i })).toHaveStyle({
      fontSize: theme.font.sizes.xxsmall
    })
  })

  it('should render the medium heading', () => {
    renderWithTheme(<Heading size="medium">Reactjs</Heading>)
    expect(screen.getByRole('heading', { name: /Reactjs/i })).toHaveStyle({
      fontSize: theme.font.sizes.medium
    })
  })

  it('should render the large heading', () => {
    renderWithTheme(<Heading size="large">Reactjs</Heading>)
    expect(screen.getByRole('heading', { name: /Reactjs/i })).toHaveStyle({
      fontSize: theme.font.sizes.xlarge
    })
  })

  it('should render the white heading by default', () => {
    renderWithTheme(<Heading>Reactjs</Heading>)
    expect(screen.getByRole('heading', { name: /Reactjs/i })).toHaveStyle({
      color: theme.colors.white
    })
  })

  it('should render the gray heading', () => {
    renderWithTheme(<Heading color="gray">Reactjs</Heading>)
    expect(screen.getByRole('heading', { name: /Reactjs/i })).toHaveStyle({
      color: theme.colors.gray
    })
  })
})
