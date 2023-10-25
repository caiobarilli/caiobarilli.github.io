import * as S from './styles'

export type LinkProps = {
  children: React.ReactNode
  size?: 'small' | 'medium'
  url?: string
}

const Link = ({ children, size = 'small', url = '/', ...props }: LinkProps) => {
  return (
    <S.Wrapper size={size} href={url} {...props}>
      {children}
    </S.Wrapper>
  )
}

export default Link
