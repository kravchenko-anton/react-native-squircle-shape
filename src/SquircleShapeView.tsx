import type { ReactElement } from 'react';
import { View, type ViewProps } from 'react-native';

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

  // Web fallback: standard View (no native squircle path).
  return <View {...props} />;
}
