import { useMemo, useRef, useState } from 'react';
import {
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type HostInstance,
  type LayoutChangeEvent,
} from 'react-native';
import { SquircleShapeView } from 'react-native-squircle-shape';

const DEMO_SIZE = 160;
const MAX_RADIUS = DEMO_SIZE / 2;

function PureJsSlider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 1,
}: {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
}) {
  const trackRef = useRef<HostInstance>(null);
  const trackWidthRef = useRef(0);
  const trackPageXRef = useRef(0);

  const minRef = useRef(minimumValue);
  const maxRef = useRef(maximumValue);
  const onChangeRef = useRef(onValueChange);
  minRef.current = minimumValue;
  maxRef.current = maximumValue;
  onChangeRef.current = onValueChange;

  const updateFromPageX = (pageX: number) => {
    const width = trackWidthRef.current;
    if (width <= 0) {
      return;
    }
    const ratio = Math.min(
      1,
      Math.max(0, (pageX - trackPageXRef.current) / width)
    );
    onChangeRef.current(
      minRef.current + ratio * (maxRef.current - minRef.current)
    );
  };

  const measureTrack = (after?: () => void) => {
    trackRef.current?.measureInWindow((x, _y, width) => {
      trackPageXRef.current = x;
      trackWidthRef.current = width;
      after?.();
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (evt) => {
        const pageX = evt.nativeEvent.pageX;
        measureTrack(() => updateFromPageX(pageX));
      },
      onPanResponderMove: (evt) => {
        updateFromPageX(evt.nativeEvent.pageX);
      },
    })
  ).current;

  const onLayout = (event: LayoutChangeEvent) => {
    trackWidthRef.current = event.nativeEvent.layout.width;
    measureTrack();
  };

  const thumbLeft = useMemo(() => {
    const range = maximumValue - minimumValue;
    const ratio = range === 0 ? 0 : (value - minimumValue) / range;
    return `${ratio * 100}%` as `${number}%`;
  }, [maximumValue, minimumValue, value]);

  return (
    <View
      ref={trackRef}
      style={styles.sliderHitArea}
      onLayout={onLayout}
      {...panResponder.panHandlers}
    >
      <View style={styles.sliderTrack} />
      <View style={[styles.sliderFill, { width: thumbLeft }]} />
      <View style={[styles.sliderThumb, { left: thumbLeft }]} />
    </View>
  );
}

export default function App() {
  const [borderRadius, setBorderRadius] = useState(40);

  return (
    <View style={styles.screen}>
      <View style={styles.demoPanel}>
        <Text style={styles.title}>SquircleShapeView</Text>
        <Text style={styles.label}>
          Interactive · borderRadius {Math.round(borderRadius)}
        </Text>
        <SquircleShapeView
          cornerSmoothing={1}
          style={[
            styles.fill,
            { borderRadius, width: DEMO_SIZE, height: DEMO_SIZE },
          ]}
        />
        <View style={styles.sliderRow}>
          <Text style={styles.sliderEdge}>0</Text>
          <PureJsSlider
            value={borderRadius}
            onValueChange={setBorderRadius}
            minimumValue={0}
            maximumValue={MAX_RADIUS}
          />
          <Text style={styles.sliderEdge}>{MAX_RADIUS}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>smoothing 0</Text>
        <SquircleShapeView
          cornerSmoothing={0}
          style={[styles.box, styles.fill]}
        />

        <Text style={styles.label}>smoothing 0.6 (default)</Text>
        <SquircleShapeView style={[styles.box, styles.fill]} />

        <Text style={styles.label}>smoothing 1 + border</Text>
        <SquircleShapeView
          cornerSmoothing={1}
          style={[styles.box, styles.fill, styles.bordered]}
        />

        <Text style={styles.label}>overflow hidden</Text>
        <SquircleShapeView
          cornerSmoothing={0.8}
          style={[styles.box, styles.overflow]}
        >
          <View style={styles.child} />
        </SquircleShapeView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  demoPanel: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 12,
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d1d5db',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  label: {
    marginTop: 12,
    opacity: 0.7,
  },
  box: {
    width: 120,
    height: 120,
    borderRadius: 28,
  },
  fill: {
    backgroundColor: '#32a852',
  },
  bordered: {
    backgroundColor: '#3b82f6',
    borderWidth: 3,
    borderColor: '#111827',
  },
  overflow: {
    backgroundColor: '#f59e0b',
    overflow: 'hidden',
  },
  child: {
    width: 160,
    height: 160,
    marginTop: -20,
    marginLeft: -20,
    backgroundColor: '#ef4444',
  },
  sliderRow: {
    width: '80%',
    maxWidth: 320,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
  },
  sliderEdge: {
    minWidth: 18,
    textAlign: 'center',
    opacity: 0.55,
    fontVariant: ['tabular-nums'],
  },
  sliderHitArea: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d1d5db',
  },
  sliderFill: {
    position: 'absolute',
    left: 0,
    top: 16,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#32a852',
  },
  sliderThumb: {
    position: 'absolute',
    top: 7,
    width: 22,
    height: 22,
    marginLeft: -11,
    borderRadius: 11,
    backgroundColor: '#111827',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
});
