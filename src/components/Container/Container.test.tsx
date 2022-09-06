import { renderWithTheme } from 'utils/tests/helpers'
import theme from 'styles/theme'

import { Container } from '.'

describe('<Container />', () => {
  it('should render the container', () => {
    const { container } = renderWithTheme(<Container>Hello World</Container>)

    expect(container.firstChild).toHaveTextContent('Hello World')

    expect(container.firstChild).toHaveStyle({
      'max-width': theme.grid.container
    })
  })

  it('should render the container with a larger width', () => {
    const { container } = renderWithTheme(
      <Container larger>Hello World</Container>
    )

    expect(container.firstChild).toHaveStyle({
      'max-width': theme.grid.containerLarge
    })
  })
})
