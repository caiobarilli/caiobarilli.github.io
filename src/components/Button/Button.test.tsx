import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Button from '.'

describe('<Button />', () => {
  it('should render button', () => {
    renderWithTheme(<Button>Hello</Button>)

    expect(screen.getByRole('button', { name: /Hello/i })).toBeInTheDocument()
  })

  it('should render button as a link', () => {
    renderWithTheme(
      <Button as="a" href="#">
        Hello
      </Button>
    )

    expect(screen.getByRole('link', { name: /Hello/i })).toBeInTheDocument()
  })

  it('should render button with icon', () => {
    renderWithTheme(<Button icon={<span>Icon</span>}>Hello</Button>)

    expect(screen.getByText('Icon')).toBeInTheDocument()
  })
})
