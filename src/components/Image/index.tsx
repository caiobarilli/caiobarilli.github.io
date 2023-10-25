import * as S from './styles'

type ImageTypes =
  | React.HTMLAttributes<HTMLImageElement>
  | React.ImgHTMLAttributes<HTMLImageElement>

export type ImageProps = {
  src: string
  mode?: 'rounded' | 'borderRadius'
} & ImageTypes

const Image = ({ src, mode = 'rounded', ...props }: ImageProps) => (
  <S.Wrapper>
    <S.Image src={src} mode={mode} {...props} />
  </S.Wrapper>
)

export default Image
