import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import { Github } from '@styled-icons/boxicons-logos/Github'
import theme from 'styles/theme'

import Text from '.'

describe('<Text />', () => {
  it('should render the text', () => {
    renderWithTheme(<Text>Reactjs Boilerplate</Text>)
    expect(screen.getByText('Reactjs Boilerplate')).toBeInTheDocument()
  })

  it('should render the text with icon', () => {
    renderWithTheme(
      <Text icon={<Github data-testid="icon" />}>Reactjs Boilerplate</Text>
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByText('Reactjs Boilerplate')).toBeInTheDocument()
  })

  it('should render the text with white color by default', () => {
    renderWithTheme(<Text>Reactjs Boilerplate</Text>)

    expect(screen.getByText('Reactjs Boilerplate')).toHaveStyle({
      color: theme.colors.white
    })
  })

  it('should render the text with gray color', () => {
    renderWithTheme(<Text color="gray">Reactjs Boilerplate</Text>)

    expect(screen.getByText('Reactjs Boilerplate')).toHaveStyle({
      color: theme.colors.gray
    })
  })

  it('should render the text with small size', () => {
    renderWithTheme(<Text size="small">Reactjs Boilerplate</Text>)

    expect(screen.getByText('Reactjs Boilerplate')).toHaveStyle({
      fontSize: theme.font.sizes.xxsmall
    })
  })

  it('should render the text with medium size', () => {
    renderWithTheme(<Text size="medium">Reactjs Boilerplate</Text>)

    expect(screen.getByText('Reactjs Boilerplate')).toHaveStyle({
      fontSize: theme.font.sizes.small
    })
  })
})
