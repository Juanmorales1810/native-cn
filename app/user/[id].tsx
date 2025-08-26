import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
    ArrowLeftIcon,
    CalendarIcon,
    GlobeIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
    BriefcaseIcon,
    UserIcon,
    MoonStarIcon,
    SunIcon,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';

// Datos expandidos de usuarios
const userData = [
    {
        id: '1',
        name: 'Juan Pérez',
        age: 25,
        country: 'Argentina',
        email: 'juan.perez@email.com',
        phone: '+54 11 1234-5678',
        city: 'Buenos Aires',
        profession: 'Desarrollador Frontend',
        company: 'Tech Solutions SA',
        bio: 'Desarrollador apasionado por React Native y las nuevas tecnologías. Con 3 años de experiencia en el desarrollo de aplicaciones móviles.',
        status: 'Activo',
        joinDate: '2023-01-15',
    },
    {
        id: '2',
        name: 'Ana García',
        age: 30,
        country: 'Chile',
        email: 'ana.garcia@email.com',
        phone: '+56 9 8765-4321',
        city: 'Santiago',
        profession: 'Diseñadora UX/UI',
        company: 'Design Studio',
        bio: 'Diseñadora creativa especializada en experiencia de usuario y interfaces móviles. Amante del diseño minimalista.',
        status: 'Activo',
        joinDate: '2022-08-22',
    },
    {
        id: '3',
        name: 'Luis Rodriguez',
        age: 28,
        country: 'Perú',
        email: 'luis.rodriguez@email.com',
        phone: '+51 1 2345-6789',
        city: 'Lima',
        profession: 'Backend Developer',
        company: 'Cloud Systems',
        bio: 'Especialista en arquitecturas cloud y APIs REST. Entusiasta de las metodologías ágiles y DevOps.',
        status: 'Inactivo',
        joinDate: '2023-03-10',
    },
    {
        id: '4',
        name: 'María López',
        age: 22,
        country: 'México',
        email: 'maria.lopez@email.com',
        phone: '+52 55 3456-7890',
        city: 'Ciudad de México',
        profession: 'Data Scientist',
        company: 'Analytics Corp',
        bio: 'Científica de datos con experiencia en machine learning y análisis predictivo. Graduada en Matemáticas Aplicadas.',
        status: 'Activo',
        joinDate: '2023-06-01',
    },
    {
        id: '5',
        name: 'Carlos Mendoza',
        age: 35,
        country: 'Colombia',
        email: 'carlos.mendoza@email.com',
        phone: '+57 1 4567-8901',
        city: 'Bogotá',
        profession: 'Project Manager',
        company: 'Agile Solutions',
        bio: 'Gerente de proyectos certificado PMP con más de 8 años liderando equipos de desarrollo de software.',
        status: 'Activo',
        joinDate: '2021-11-18',
    },
    {
        id: '6',
        name: 'Sofía Martínez',
        age: 27,
        country: 'Uruguay',
        email: 'sofia.martinez@email.com',
        phone: '+598 2 5678-9012',
        city: 'Montevideo',
        profession: 'QA Engineer',
        company: 'Quality First',
        bio: 'Ingeniera de calidad especializada en testing automatizado y metodologías de testing ágil.',
        status: 'Activo',
        joinDate: '2022-12-05',
    },
    {
        id: '7',
        name: 'Diego Vargas',
        age: 31,
        country: 'Ecuador',
        email: 'diego.vargas@email.com',
        phone: '+593 2 6789-0123',
        city: 'Quito',
        profession: 'DevOps Engineer',
        company: 'Infrastructure Pro',
        bio: 'Especialista en infraestructura cloud, Docker, Kubernetes y CI/CD. Apasionado por la automatización.',
        status: 'Activo',
        joinDate: '2022-04-14',
    },
    {
        id: '8',
        name: 'Valentina Torres',
        age: 24,
        country: 'Venezuela',
        email: 'valentina.torres@email.com',
        phone: '+58 212 789-0123',
        city: 'Caracas',
        profession: 'Mobile Developer',
        company: 'Mobile Innovations',
        bio: 'Desarrolladora móvil especializada en Flutter y React Native. Siempre explorando las últimas tendencias tecnológicas.',
        status: 'Activo',
        joinDate: '2023-09-08',
    },
];

const SCREEN_OPTIONS = {
    light: {
        title: 'Detalle del Usuario',
        headerTransparent: true,
        headerShadowVisible: true,
        headerStyle: { backgroundColor: THEME.light.background },
        headerRight: () => <ThemeToggle />,
    },
    dark: {
        title: 'Detalle del Usuario',
        headerTransparent: true,
        headerShadowVisible: true,
        headerStyle: { backgroundColor: THEME.dark.background },
        headerRight: () => <ThemeToggle />,
    },
};

export default function UserDetailScreen() {
    const { colorScheme } = useColorScheme();
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const user = userData.find((u) => u.id === id);

    if (!user) {
        return (
            <>
                <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
                <View className="flex-1 items-center justify-center bg-background">
                    <Text variant="h3">Usuario no encontrado</Text>
                    <Button onPress={() => router.back()} className="mt-4">
                        <Text>Volver </Text>
                    </Button>
                </View>
            </>
        );
    }

    const getStatusBadgeVariant = (status: string) => {
        return status === 'Activo' ? 'default' : 'secondary';
    };

    const image = require('../../assets/images/14571534_5479108.jpg');

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
            <ScrollView
                className="flex-1 bg-background"
                contentContainerStyle={{ paddingBottom: 32 }}
                keyboardShouldPersistTaps="handled">
                {/* Header */}
                <ImageBackground source={image} resizeMode="cover">
                    <View className="bg-primary/5 pb-6 pt-28">
                        <View className="px-6">
                            <View className="items-center">
                                <Avatar alt={user.name} className="mb-4 size-24">
                                    <AvatarFallback>
                                        <Icon
                                            as={UserIcon}
                                            className="size-12 text-muted-foreground"
                                        />
                                    </AvatarFallback>
                                </Avatar>
                                <Text variant="h2" className="mb-2 text-center text-white">
                                    {user.name}
                                </Text>
                                <Badge
                                    variant={getStatusBadgeVariant(user.status)}
                                    className="mb-2">
                                    <Text>{user.status}</Text>
                                </Badge>
                                <Text variant="muted" className="text-center text-white">
                                    {user.profession}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                {/* Content */}
                <View className="p-6">
                    {/* Bio */}
                    <Card className="mb-6 p-4">
                        <Text variant="h4" className="mb-2">
                            Biografía
                        </Text>
                        <Text variant="muted" className="leading-6">
                            {user.bio}
                        </Text>
                    </Card>

                    {/* Contact Info */}
                    <Card className="mb-6 p-4">
                        <Text variant="h4" className="mb-4">
                            Información de Contacto
                        </Text>

                        <View className="gap-3">
                            <View className="flex-row items-center gap-3">
                                <Icon as={MailIcon} className="size-5 text-primary" />
                                <Text variant="default">{user.email}</Text>
                            </View>

                            <View className="flex-row items-center gap-3">
                                <Icon as={PhoneIcon} className="size-5 text-primary" />
                                <Text variant="default">{user.phone}</Text>
                            </View>

                            <View className="flex-row items-center gap-3">
                                <Icon as={MapPinIcon} className="size-5 text-primary" />
                                <Text variant="default">
                                    {user.city}, {user.country}
                                </Text>
                            </View>
                        </View>
                    </Card>

                    {/* Professional Info */}
                    <Card className="mb-6 p-4">
                        <Text variant="h4" className="mb-4">
                            Información Profesional
                        </Text>

                        <View className="gap-3">
                            <View className="flex-row items-center gap-3">
                                <Icon as={BriefcaseIcon} className="size-5 text-primary" />
                                <Text variant="default">{user.company}</Text>
                            </View>

                            <View className="flex-row items-center gap-3">
                                <Icon as={CalendarIcon} className="size-5 text-primary" />
                                <Text variant="default">
                                    Se unió el {new Date(user.joinDate).toLocaleDateString('es-ES')}
                                </Text>
                            </View>

                            <View className="flex-row items-center gap-3">
                                <Icon as={GlobeIcon} className="size-5 text-primary" />
                                <Text variant="default">{user.age} años</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Actions */}
                    <View className="gap-3">
                        <Button variant="default" className="w-full">
                            <Icon as={MailIcon} className="mr-2 size-4" />
                            <Text>Enviar Mensaje</Text>
                        </Button>

                        <Button variant="outline" className="w-full">
                            <Icon as={PhoneIcon} className="mr-2 size-4" />
                            <Text>Llamar</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

const THEME_ICONS = {
    light: SunIcon,
    dark: MoonStarIcon,
};

function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
        <Button
            onPressIn={toggleColorScheme}
            size="icon"
            variant="ghost"
            className="rounded-full web:mx-4">
            <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
        </Button>
    );
}
