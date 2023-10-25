import * as S from './styles'

export type LinkProps = {
  children: React.ReactNode
  size?: 'small' | 'medium'
  url?: string
  onClick?: () => void
}

const Link = ({
  children,
  onClick,
  size = 'small',
  url = '/',
  ...props
}: LinkProps) => {
  return (
    <S.Wrapper size={size} onClick={onClick} href={url} {...props}>
      {children}
    </S.Wrapper>
  )
}

export default Link
