import styled, { css } from 'styled-components'

type ContainerProps = {
  larger?: boolean
}

export const Container = styled.div<Pick<ContainerProps, 'larger'>>`
  ${({ theme, larger }) => css`
    width: 100%;
    ${larger
      ? css`
          max-width: ${theme.grid.containerLarge};
        `
      : css`
          max-width: ${theme.grid.container};
        `}

    margin-left: auto;
    margin-right: auto;
    padding-left: calc(${theme.grid.gutter} / 2);
    padding-right: calc(${theme.grid.gutter} / 2);
  `}
`
