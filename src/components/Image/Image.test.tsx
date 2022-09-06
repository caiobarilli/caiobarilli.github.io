import { screen } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helpers'

import Image from '.'

describe('<Image />', () => {
  it('should render the profile image', () => {
    renderWithTheme(<Image src="/img/profile.png" data-testid="image" />)
    expect(screen.getByTestId('image')).toBeInTheDocument()
  })

  it('should render the profile image with rounded mode', () => {
    renderWithTheme(
      <Image src="/img/profile.png" mode="rounded" data-testid="image" />
    )

    expect(screen.getByTestId('image')).toHaveStyle({
      borderRadius: theme.border.rounded
    })
  })

  it('should render the profile image with borderRadius mode', () => {
    renderWithTheme(
      <Image src="/img/profile.png" mode="borderRadius" data-testid="image" />
    )

    expect(screen.getByTestId('image')).toHaveStyle({
      borderRadius: theme.border.radius
    })
  })
})
