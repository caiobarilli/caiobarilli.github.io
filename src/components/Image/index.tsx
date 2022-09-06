import * as S from './styles'

export type ImageProps = {
  src: string
  mode?: 'rounded' | 'borderRadius'
}

const Image = ({ src, mode = 'rounded', ...props }: ImageProps) => (
  <S.Wrapper>
    <S.Image src={src} mode={mode} {...props} />
  </S.Wrapper>
)

export default Image
