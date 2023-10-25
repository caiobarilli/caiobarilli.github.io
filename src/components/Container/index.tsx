import styled, { css } from 'styled-components'

type ContainerProps = {
  $larger?: boolean
  $extraLarger?: boolean
  $center?: boolean
}

export const Container = styled.div<ContainerProps>`
  ${({ theme, $larger, $extraLarger, $center }) => css`
    width: 100%;
    max-width: ${theme.grid.container};

    ${$larger &&
    css`
      max-width: ${theme.grid.containerLarge};
    `}

    ${$extraLarger &&
    css`
      max-width: ${theme.grid.containerExtraLarge};
    `}

    ${$center &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}

    padding-left: calc(${theme.grid.gutter} / 2);
    padding-right: calc(${theme.grid.gutter} / 2);
  `}
`
