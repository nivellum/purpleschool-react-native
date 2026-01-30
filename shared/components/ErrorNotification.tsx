import { forwardRef, Ref, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, ViewProps } from "react-native";
import { Color, Typography } from "../design/tokens";

export type ErrorNotificationRef = {
    show: (error?: string) => void;
}

type ErrorNotificationProps = {
    duration?: number;
} & ViewProps


export const ErrorNotification = forwardRef<ErrorNotificationRef, ErrorNotificationProps>(({ style, duration = 3000, ...rest }, ref) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [message, setMessage] = useState<string | undefined>();
    
    const translateYValue = useRef(new Animated.Value(0)).current;

    const animatedTranslateYValue = translateYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-150, 0]
    })


    const animateIn = (callback: Animated.EndCallback | undefined) => {

        translateYValue.stopAnimation();

        Animated.timing(translateYValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true
        }).start(callback);
    }

    const animateOut = (callback: Animated.EndCallback | undefined) => {
        
        translateYValue.stopAnimation();

        Animated.timing(translateYValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true
        }).start(callback)
    }

    useEffect(() => {
        return () => {
            timerRef?.current && clearTimeout(timerRef.current);
            translateYValue.stopAnimation();
        }
    }, []);

    useImperativeHandle(ref, () => {
        return {
            show: (error?: string) => {
                timerRef?.current && clearTimeout(timerRef.current);
                timerRef.current = null;

                // animateOut(() => {
                
                setMessage(error);

                animateIn(() => {

                    timerRef?.current && clearTimeout(timerRef.current);

                    timerRef.current = setTimeout(() => {
                        animateOut(() => {
                            setMessage(undefined);
                            timerRef?.current && clearTimeout(timerRef.current);
                            timerRef.current = null;
                        });
                    }, duration);
                });
                // });
            }
        }
    })

    return (
        <Animated.View {...rest}
            style={[
                styles.container, 
                style, {
                transform: [{ translateY: animatedTranslateYValue }]
            }]}>
            <Text style={styles.text}>{message ?? "Oops, something went wrong!"}</Text>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: Color.red,
        padding: 10,
    },
    text: {
        fontFamily: Typography.fonts.regular,
        fontSize: Typography.size.md,
        color: Color.white,
        textAlign: "center",
        textShadowColor: "#0006",
        textShadowRadius: 4,
        textShadowOffset: { width: 2, height: 2 }
    }
});
