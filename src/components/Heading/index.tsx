import * as S from './styles'

export type HeadingProps = {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
  color?: 'text' | 'secondText'
}

function Heading({ children, size = 'large', color = 'text' }: HeadingProps) {
  console.log(import.meta.env.DEV)

  return (
    <S.Title size={size} color={color}>
      {children}
    </S.Title>
  )
}

export default Heading
