import Menu from '@/components/Menu'
import * as S from './styles'

type BaseProps = {
  children: JSX.Element
}

const Base = ({ children }: BaseProps) => {
  return (
    <S.Wrapper>
      <Menu />
      {children}
    </S.Wrapper>
  )
}

export default Base
