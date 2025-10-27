/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const CircularDotsLoader = ({
  size = 50,
  dotSize = 8,
  color = null,
}: {
  size: number;
  dotSize: number;
  color?: null | string;
}) => {
  const { colors } = useTheme();
  const animations = React.useRef<Animated.Value[]>(
    Array.from({ length: 8 }, () => new Animated.Value(0))
  ).current;

  React.useEffect(() => {
    const animationSequence = animations.map((anim, index) =>
      Animated.sequence([
        Animated.delay(index * 125),
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.delay(700),
          ])
        ),
      ])
    );

    Animated.parallel(animationSequence).start();
  }, []);

  const dots = Array.from({ length: 8 }).map((_, index) => {
    const angle = (index * 360) / 8;
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * (size / 2 - dotSize);
    const y = Math.sin(radian) * (size / 2 - dotSize);

    const scale = (animations[index] as Animated.Value).interpolate({
      inputRange: [0, 1],
      outputRange: [0.5, 1.2],
    });

    const opacity = (animations[index] as Animated.Value).interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.circularDot,
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: color ?? colors.primary,
            left: size / 2 + x - dotSize / 2,
            top: size / 2 + y - dotSize / 2,
            transform: [{ scale }],
            opacity,
          },
        ]}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size, position: 'relative' }}>
        {dots}
      </View>
    </View>
  );
};

export const WaveLoader = ({
  dotCount = 5,
  color = null,
}: {
  dotCount: number;
  color?: null | string;
}) => {
  const { colors } = useTheme();
  const animations = React.useRef(
    Array.from({ length: dotCount }, () => new Animated.Value(0))
  ).current;

  React.useEffect(() => {
    const animationSequence = animations.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(anim, {
            toValue: 1,
            duration: 500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
        ])
      )
    );

    Animated.parallel(animationSequence).start();
  }, []);

  return (
    <View style={styles.waveContainer}>
      {animations.map((anim, index) => {
        const translateY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.waveDot,
              {
                backgroundColor: color ?? colors.primary,
                transform: [{ translateY }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export const PulseRingsLoader = ({
  size = 80,
  color = null,
}: {
  size: number;
  color?: null | string;
}) => {
  const { colors } = useTheme();
  const pulse1 = React.useRef(new Animated.Value(0)).current;
  const pulse2 = React.useRef(new Animated.Value(0)).current;
  const pulse3 = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const createPulse = (
      anim: Animated.Value | Animated.ValueXY,
      delay: number
    ) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    createPulse(pulse1, 0);
    createPulse(pulse2, 666);
    createPulse(pulse3, 1333);

    return () => {
      pulse1.stopAnimation();
      pulse2.stopAnimation();
      pulse3.stopAnimation();
    };
  }, []);

  const createRingStyle = (anim: Animated.Value) => ({
    scale: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    opacity: anim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.8, 0.4, 0],
    }),
  });

  return (
    <View style={styles.container}>
      <View style={{ width: size, height: size }}>
        {[pulse1, pulse2, pulse3].map((anim, index) => (
          <Animated.View
            key={index}
            style={[
              styles.pulseRing,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: 3,
                borderColor: color ?? colors.primary,
                transform: [{ scale: createRingStyle(anim).scale }],
                opacity: createRingStyle(anim).opacity,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export const BarLoader = ({
  barCount = 5,
  color = null,
}: {
  barCount: number;
  color?: null | string;
}) => {
  const animations = React.useRef(
    Array.from({ length: barCount }, () => new Animated.Value(0))
  ).current;
  const { colors } = useTheme();

  React.useEffect(() => {
    const animationSequence = animations.map((anim, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(anim, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      )
    );

    Animated.parallel(animationSequence).start();
  }, []);

  return (
    <View style={styles.barContainer}>
      {animations.map((anim, index) => {
        const scaleY = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.bar,
              {
                backgroundColor: color ?? colors.primary,
                transform: [{ scaleY }],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export const OrbitLoader = ({
  size = 60,
  color = null,
}: {
  size: number;
  color?: null | string;
}) => {
  const { colors } = useTheme();
  const rotateValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.orbitContainer,
          { width: size, height: size, transform: [{ rotate }] },
        ]}
      >
        <View
          style={[
            styles.orbitDot,
            {
              backgroundColor: color ?? colors.primary,
              top: 0,
              left: size / 2 - 6,
            },
          ]}
        />
        <View
          style={[
            styles.orbitDot,
            {
              backgroundColor: color ?? colors.primary,
              bottom: 0,
              left: size / 2 - 6,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

export const SquareLoader = ({
  size = 50,
  color = null,
}: {
  size: number;
  color?: null | string;
}) => {
  const { colors } = useTheme();
  const rotateValue = React.useRef(new Animated.Value(0)).current;
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 0.7,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, []);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            width: size,
            height: size,
            backgroundColor: color ?? colors.primary,
            transform: [{ rotate }, { scale: scaleValue }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {},
  circularDot: {
    position: 'absolute',
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  waveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pulseRing: {
    position: 'absolute',
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    height: 40,
  },
  bar: {
    width: 4,
    height: 30,
    borderRadius: 2,
  },
  orbitContainer: {
    position: 'relative',
  },
  orbitDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
  },
  square: {
    borderRadius: 5,
  },
});
