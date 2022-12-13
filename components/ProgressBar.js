import * as React from 'react';
import { Text, View, StyleSheet, Animated, Easing } from 'react-native';
import { useRef, useEffect } from 'react';

export default function ProgressBar(props) {
  const animatedProgressValue = useRef(
    new Animated.Value(props.progress)
  ).current;

  useEffect(() => {
    var progress = props.progress;
    if (progress > 100) progress = 100;
    if (progress < 0) progress = 0;

    Animated.timing(animatedProgressValue, {
      toValue:progress, 
      duration:200,
      easing: Easing.quad,
      useNativeDriver: false,
    }).start()
  }, [props.progress, animatedProgressValue])
  return (
    <View
      style={[
        styles.container, 
        {
          height: 10, 
          width:'100%',
          backgroundColor:props.backgroundColor,
          borderColor:props.borderColor
        }
      ]}>
      <Animated.View
        style={[
          styles.bar,
          {
            backgroundColor: props.barColor,
            width: animatedProgressValue.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}></Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { left: 0, top: 0, bottom: 0, position: 'absolute' },
  container: { borderRadius: 5, borderWidth: 1, overflow: 'hidden' },
});