import styled, { css, keyframes } from 'styled-components'

type MenuProps = {
  $menuIsOpen: boolean | undefined
}

export const Wrapper = styled.nav`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: flex-start;

  @media print {
    display: none;
  }
`

export const wrapperButtons = styled.div`
  ${({ theme }) => css`
    z-index: ${theme.layers.overlay};
    background: ${theme.colors.backgroundBtnMenu};
    display: flex;
    position: fixed;
    flex-direction: column;
    padding: 6px 0;
    height: calc(100% - 6px);
    width: 3.2rem;
  `}
`

const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.2;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
`

export const sideMenuButton = styled.button`
  ${({ theme }) => css`
    position: relative;
    overflow: hidden;
    border: none;
    background: ${theme.colors.backgroundBtnMenu};
    cursor: pointer;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    padding: 0.6rem 0;

    &:after {
      content: '';
      position: absolute;
      border-radius: 50%;
      background: ${theme.colors.svgBtnMenuEffect};
      transform: scale(0);
      animation: ${rippleAnimation} 600ms linear;
    }

    &:active::after {
      width: 100%;
      padding-top: 100%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

    svg {
      color: ${theme.colors.svgBtnMenu};
      width: 2rem;
      height: 2rem;
      margin: 0;
    }
  `}
`

const moveForward = keyframes`
  0% {
    transform: translate(-20rem, 0);
  }
  100% {
    transform: translate(23.2rem, 0);
  }
`

const moveBackward = keyframes`
  0% {
    transform: translate(23.2rem, 0);
  }
  100% {
    transform: translate(-20rem, 0);
  }
`

export const MenuWrapper = styled.ul<MenuProps>`
  ${({ theme, $menuIsOpen }) => css`
    z-index: ${theme.layers.base};
    background: ${theme.colors.backgroundMenu};
    width: 16.8rem;
    height: 100%;
    position: fixed;
    left: -20rem;
    margin: 0;
    padding: 1.5rem 0 0;

    animation: ${$menuIsOpen === true && moveForward}
      ${$menuIsOpen === false && moveBackward} 500ms forwards;
  `}
`

export const MenuItem = styled.li`
  ${({ theme }) => css`
    list-style-type: none;
    margin-bottom: 1rem;
    position: relative;

    &::after {
      content: '';
      width: 88%;
      height: 0.1rem;
      position: absolute;
      background: ${theme.colors.borderMenuItem};
      bottom: -0.5rem;
      right: 0;
    }

    a {
      color: ${theme.colors.textMenu};
      font-size: ${theme.font.sizes.xsmall};
      font-weight: ${theme.font.bold};
      text-decoration: none;
      text-transform: uppercase;
      margin-left: 2rem;
    }
  `}
`
