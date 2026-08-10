import type { ReactElement } from 'react';
import type { ViewProps } from 'react-native';
import SquircleShapeViewNativeComponent from './SquircleShapeViewNativeComponent';

export type SquircleShapeViewProps = ViewProps & {
  cornerSmoothing?: number;
};

export function SquircleShapeView({
  cornerSmoothing = 0.6,
  ...props
}: SquircleShapeViewProps): ReactElement {
  if (cornerSmoothing < 0 || cornerSmoothing > 1) {
    throw new Error(
      `cornerSmoothing must be between 0 and 1, inclusive. Received: ${cornerSmoothing}`
    );
  }

  return (
    <SquircleShapeViewNativeComponent
      {...props}
      cornerSmoothing={cornerSmoothing}
    />
  );
}
