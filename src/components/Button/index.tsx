import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import Text from '@/components/Text'

import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  children: string
  icon?: JSX.Element
  as?: React.ElementType
} & ButtonTypes

const Button = ({ children, icon, ...props }: ButtonProps) => (
  <S.Wrapper {...props}>
    <Text icon={icon}>{children}</Text>
  </S.Wrapper>
)

export default Button
