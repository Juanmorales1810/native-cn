import React, { useEffect, useState, ReactNode } from 'react';
import { Platform, Keyboard, View, Animated, EmitterSubscription } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView } from 'react-native';

interface KeyboardAwareProps {
    children: ReactNode;
    /** Ajuste adicional opcional (por ejemplo altura de un header fijo) */
    extraOffset?: number;
    /** Duración de la animación en ms (Android) */
    duration?: number;
}

/**
 * Componente que adapta su altura / padding inferior según el teclado.
 * iOS: usa KeyboardAvoidingView (padding) + safe area.
 * Android: escucha eventos de teclado y anima un paddingBottom.
 */
export const KeyboardAware: React.FC<KeyboardAwareProps> = ({
    children,
    extraOffset = 10,
    duration = 180,
}) => {
    const insets = useSafeAreaInsets();
    const [visibleHeight] = useState(new Animated.Value(0));

    useEffect(() => {
        if (Platform.OS === 'ios') return; // iOS lo maneja el KAV

        let showSub: EmitterSubscription | undefined;
        let hideSub: EmitterSubscription | undefined;

        showSub = Keyboard.addListener('keyboardDidShow', (e) => {
            const h = e.endCoordinates.height + extraOffset;
            Animated.timing(visibleHeight, {
                toValue: h,
                duration,
                useNativeDriver: false,
            }).start();
        });

        hideSub = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(visibleHeight, {
                toValue: 0,
                duration,
                useNativeDriver: false,
            }).start();
        });

        return () => {
            showSub?.remove();
            hideSub?.remove();
        };
    }, [visibleHeight, extraOffset, duration]);

    if (Platform.OS === 'ios') {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={insets.top + extraOffset}>
                {children}
            </KeyboardAvoidingView>
        );
    }

    return (
        <Animated.View style={{ flex: 1, paddingBottom: visibleHeight }}>{children}</Animated.View>
    );
};

export default KeyboardAware;
