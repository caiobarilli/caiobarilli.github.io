import * as S from './styles'

export type HeadingProps = {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  color?: 'white' | 'gray'
}

function Heading({ children, size = 'large', color = 'white' }: HeadingProps) {
  return (
    <S.Title size={size} color={color}>
      {children}
    </S.Title>
  )
}

export default Heading
