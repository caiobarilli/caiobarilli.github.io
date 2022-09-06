import { renderWithTheme } from 'utils/tests/helpers'

import Hr from '.'

describe('<Hr />', () => {
  it('should render the line', () => {
    renderWithTheme(<Hr />)
  })
})
