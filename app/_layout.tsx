import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
    const { colorScheme } = useColorScheme();
    const insets = useSafeAreaInsets();

    return (
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
            {Platform.OS === 'ios' ? (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    keyboardVerticalOffset={insets.top}
                    enabled>
                    <View style={{ flex: 1 }}>
                        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                        <Stack />
                        <PortalHost />
                    </View>
                </KeyboardAvoidingView>
            ) : (
                <View style={{ flex: 1 }}>
                    <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                    <Stack />
                    <PortalHost />
                </View>
            )}
        </ThemeProvider>
    );
}
