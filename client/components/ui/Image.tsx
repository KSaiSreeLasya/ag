import * as React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export default function Image({ fallbackSrc = "/placeholder.svg", onError, ...props }: ImageProps) {
  const [src, setSrc] = React.useState(props.src);

  React.useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (onError) onError(e);
    if (src !== fallbackSrc) setSrc(fallbackSrc);
  };

  return <img {...props} src={src} onError={handleError} />;
}
