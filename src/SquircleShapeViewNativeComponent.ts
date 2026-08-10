import {
  codegenNativeComponent,
  type CodegenTypes,
  type ViewProps,
} from 'react-native';

interface NativeProps extends ViewProps {
  cornerSmoothing: CodegenTypes.Float;
}

export default codegenNativeComponent<NativeProps>('SquircleShapeView');
