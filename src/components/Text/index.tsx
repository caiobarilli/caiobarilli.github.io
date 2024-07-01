import * as S from './styles'

export type TextProps = {
  children: React.ReactNode
  bold?: boolean
  size?: 'small' | 'medium'
  color?: 'text' | 'secondText' | 'thirdText'
  icon?: JSX.Element
}

const Text = ({
  children,
  icon,
  bold,
  size = 'small',
  color = 'text',
  ...props
}: TextProps) => (
  <S.Wrapper size={size} bold={bold} color={color} {...props}>
    {!!icon && <S.IconWrapper> {icon} </S.IconWrapper>}
    <S.TextWrapper>{children}</S.TextWrapper>
  </S.Wrapper>
)

export default Text
