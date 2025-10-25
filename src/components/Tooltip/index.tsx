import { useState, useCallback, useRef, type ReactNode, type FC } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
  type TextStyle,
  Dimensions,
  type LayoutChangeEvent,
  findNodeHandle,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  backgroundColor?: string;
  textColor?: string;
  containerStyle?: ViewStyle;
  contentStyle?: TextStyle;
  offset?: number;
}

export const Tooltip: FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  backgroundColor = '#333',
  textColor = '#fff',
  containerStyle,
  contentStyle,
  offset = 8,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const [layout, setLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const triggerRef = useRef<any>(null);

  const measureTooltip = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setTooltipWidth(width);
    setTooltipHeight(height);
  }, []);

  const showTooltip = useCallback(() => {
    if (triggerRef.current) {
      const handle = findNodeHandle(triggerRef.current);
      if (handle) {
        triggerRef.current.measure(
          (
            width: number,
            height: number,
            pageX: number,
            pageY: number
          ): void => {
            setLayout({
              x: pageX,
              y: pageY,
              width,
              height,
            });
            setIsVisible(true);
          }
        );
      }
    }
  }, []);

  const getTooltipStyle = (): ViewStyle => {
    const style: ViewStyle = {
      position: 'absolute',
      backgroundColor,
      padding: 8,
      borderRadius: 4,
      maxWidth: SCREEN_WIDTH * 0.8,
    };

    let left = layout.x + (layout.width - tooltipWidth) / 2;
    left = Math.max(8, Math.min(left, SCREEN_WIDTH - tooltipWidth - 8));

    switch (position) {
      case 'top':
        style.left = left;
        style.top = layout.y - tooltipHeight - offset;
        break;
      case 'bottom':
        style.left = left;
        style.top = layout.y + layout.height + offset;
        break;
      case 'left':
        style.right = SCREEN_WIDTH - layout.x + offset;
        style.top = layout.y + (layout.height - tooltipHeight) / 2;
        break;
      case 'right':
        style.left = layout.x + layout.width + offset;
        style.top = layout.y + (layout.height - tooltipHeight) / 2;
        break;
    }

    return style;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        ref={triggerRef}
        onPress={showTooltip}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View
            style={[styles.tooltip, getTooltipStyle()]}
            onLayout={measureTooltip}
          >
            <Text style={[styles.content, { color: textColor }, contentStyle]}>
              {content}
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tooltip: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    fontSize: 14,
  },
});
