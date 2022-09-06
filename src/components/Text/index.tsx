import * as S from './styles'

export type TextProps = {
  children: React.ReactNode
  size?: 'small' | 'medium'
  color?: 'white' | 'gray' | 'lightGray'
  icon?: JSX.Element
}

const Text = ({
  children,
  icon,
  size = 'small',
  color = 'white',
  ...props
}: TextProps) => (
  <S.Wrapper size={size} color={color} {...props}>
    {!!icon && icon}
    {children}
  </S.Wrapper>
)

export default Text
