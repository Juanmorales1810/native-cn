import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { THEME } from '@/lib/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, useRouter } from 'expo-router';
import {
    MoonStarIcon,
    SunIcon,
    UsersIcon,
    PlusIcon,
    DownloadIcon,
    FilterIcon,
    AlertCircleIcon,
    CheckCircleIcon,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { FlatList, ImageBackground, Pressable, ScrollView, View } from 'react-native';
import KeyboardAware from '@/components/keyboard-aware';
import { Controller, useForm } from 'react-hook-form';
import { userSchema, type UserFormData, defaultUserValues } from '@/validations';

// Tipos de datos
interface User {
    id: string;
    name: string;
    age: number;
    country: string;
    email: string;
    phone: string;
    city: string;
    profession: string;
    company: string;
    bio: string;
    status: 'Activo' | 'Inactivo';
    joinDate: string;
}

// Datos de ejemplo de usuarios expandidos
const initialUserData: User[] = [
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
        bio: 'Desarrollador apasionado por React Native y las nuevas tecnologías.',
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
        bio: 'Diseñadora creativa especializada en experiencia de usuario.',
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
        bio: 'Especialista en arquitecturas cloud y APIs REST.',
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
        bio: 'Científica de datos con experiencia en machine learning.',
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
        bio: 'Gerente de proyectos certificado PMP con más de 8 años de experiencia.',
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
        bio: 'Ingeniera de calidad especializada en testing automatizado.',
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
        bio: 'Especialista en infraestructura cloud, Docker y Kubernetes.',
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
        bio: 'Desarrolladora móvil especializada en Flutter y React Native.',
        status: 'Activo',
        joinDate: '2023-09-08',
    },
];

const SCREEN_OPTIONS = {
    light: {
        title: 'Lista de Usuarios',
        headerTransparent: true,
        headerShadowVisible: true,
        headerStyle: { backgroundColor: THEME.light.background },
        headerRight: () => <ThemeToggle />,
    },
    dark: {
        title: 'Lista de Usuarios',
        headerTransparent: true,
        headerShadowVisible: true,
        headerStyle: { backgroundColor: THEME.dark.background },
        headerRight: () => <ThemeToggle />,
    },
};

export default function Screen() {
    const { colorScheme } = useColorScheme();
    const router = useRouter();
    const [userData, setUserData] = React.useState<User[]>(initialUserData);
    const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [filterStatus, setFilterStatus] = React.useState<'all' | 'Activo' | 'Inactivo'>('all');
    const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);

    // Configuración de React Hook Form con Zod
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: defaultUserValues,
    });

    // Ocultar alert después de 3 segundos
    React.useEffect(() => {
        if (showSuccessAlert) {
            const timer = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessAlert]);

    // Filtrar usuarios
    const filteredUsers = userData.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const onSubmit = (data: UserFormData) => {
        const newUser: User = {
            id: Date.now().toString(),
            name: data.name,
            age: data.age,
            country: data.country,
            email: data.email,
            phone: data.phone || '',
            city: data.city,
            profession: data.profession,
            company: data.company || '',
            bio: data.bio || '',
            status: data.status,
            joinDate: new Date().toISOString().split('T')[0],
        };

        setUserData([...userData, newUser]);
        reset();
        setIsAddModalOpen(false);
        setShowSuccessAlert(true);
    };

    const handleCloseModal = () => {
        reset();
        setIsAddModalOpen(false);
    };

    // Componente para mostrar errores de validación
    const FieldError = ({ error }: { error?: string }) => {
        if (!error) return null;
        return (
            <View className="mt-1 flex-row items-center gap-1">
                <Icon as={AlertCircleIcon} className="size-3 text-destructive" />
                <Text variant="small" className="text-destructive">
                    {error}
                </Text>
            </View>
        );
    };

    const getStatusBadgeVariant = (status: string) => {
        return status === 'Activo' ? 'default' : 'secondary';
    };

    const renderUserItem = ({ item, index }: { item: User; index: number }) => (
        <Pressable
            onPress={() => router.push(`/user/${item.id}` as any)}
            className={`flex-row border-b border-border p-4 active:bg-muted/50 ${
                index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
            }`}>
            <View className="flex-1">
                <Text variant="default" className="mb-1 pb-0.5 font-semibold text-foreground">
                    {item.name}
                </Text>
                <Text variant="small" className="mb-1 pb-0.5 text-muted-foreground">
                    {item.profession}
                </Text>
                <Text variant="small" className="pb-0.5 text-muted-foreground">
                    {item.company}
                </Text>
            </View>

            <View className="flex-1 justify-center">
                <Text variant="muted" className="mb-1 pb-0.5 text-center">
                    {item.age} años
                </Text>
                <Text variant="small" className="pb-0.5 text-center text-muted-foreground">
                    {item.city}
                </Text>
            </View>

            <View className="flex-1 items-end justify-center">
                <Badge variant={getStatusBadgeVariant(item.status)} className="mb-2">
                    <Text className="text-xs">{item.status}</Text>
                </Badge>
                <Text variant="small" className="pb-0.5 text-muted-foreground">
                    {item.country}
                </Text>
            </View>
        </Pressable>
    );

    const image = require('../assets/images/14571567_5479107.jpg');

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS[colorScheme ?? 'light']} />
            <KeyboardAware>
                <View className="flex-1 bg-background">
                    {/* Alert de éxito */}
                    {showSuccessAlert && (
                        <View className="absolute left-4 right-4 top-32 z-50">
                            <Alert icon={CheckCircleIcon} className="border-green-200 bg-green-50">
                                <AlertTitle className="text-green-800">
                                    ¡Usuario agregado exitosamente!
                                </AlertTitle>
                                <AlertDescription className="text-green-600">
                                    El nuevo usuario ha sido añadido a la lista.
                                </AlertDescription>
                            </Alert>
                        </View>
                    )}

                    {/* Header de la aplicación */}
                    <ImageBackground source={image} resizeMode="cover">
                        <View className="relativepx-4 pb-6 pt-28">
                            <View className="mb-4 items-center">
                                <Icon as={UsersIcon} className="mb-2 size-10 text-white" />
                                <Text variant="h2" className="mb-1 text-center text-white">
                                    Gestión de Usuarios
                                </Text>
                                <Text variant="muted" className="text-center text-white">
                                    {filteredUsers.length} usuarios encontrados
                                </Text>
                            </View>

                            {/* Barra de búsqueda y filtros */}
                            <View className="flex-row gap-3 px-2">
                                <View className="flex-1">
                                    <Input
                                        placeholder="Buscar usuarios..."
                                        value={searchQuery}
                                        onChangeText={setSearchQuery}
                                        className="bg-background"
                                    />
                                </View>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onPress={() =>
                                        setFilterStatus(
                                            filterStatus === 'all'
                                                ? 'Activo'
                                                : filterStatus === 'Activo'
                                                  ? 'Inactivo'
                                                  : 'all'
                                        )
                                    }>
                                    <Icon as={FilterIcon} className="size-4" />
                                </Button>
                            </View>
                            {filterStatus !== 'all' && (
                                <View className="mt-2 flex-row items-center px-4">
                                    <Text variant="small" className="text-muted-foreground">
                                        Filtro aplicado:
                                    </Text>
                                    <Badge variant="secondary" className="ml-2 rounded-full">
                                        <Text className="text-xs">
                                            {filterStatus === 'Activo' ? 'Activos' : 'Inactivos'}
                                        </Text>
                                    </Badge>
                                </View>
                            )}
                        </View>
                    </ImageBackground>

                    {/* Tabla de usuarios */}
                    <View className="mx-2 my-4 flex-1 overflow-hidden rounded-xl border border-border bg-card">
                        {/* Header de la tabla */}
                        <View className="flex-row border-b border-border bg-muted/50 p-4">
                            <View className="flex-1">
                                <Text variant="small" className="font-semibold text-foreground">
                                    Usuario
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text
                                    variant="small"
                                    className="text-center font-semibold text-foreground">
                                    Información
                                </Text>
                            </View>
                            <View className="flex-1">
                                <Text
                                    variant="small"
                                    className="text-right font-semibold text-foreground">
                                    Estado
                                </Text>
                            </View>
                        </View>

                        {/* Lista de usuarios */}
                        <FlatList
                            data={filteredUsers}
                            keyExtractor={(item) => item.id}
                            renderItem={renderUserItem}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    {/* Botones de acción */}
                    <View className="flex-row gap-3 px-4 pb-6">
                        <Button
                            variant="default"
                            className="flex-1"
                            onPress={() => setIsAddModalOpen(true)}>
                            <Icon as={PlusIcon} className="mr-2 size-4 text-white" />
                            <Text>Agregar Usuario</Text>
                        </Button>
                        <Button variant="outline" className="flex-1">
                            <Icon as={DownloadIcon} className="mr-2 size-4" />
                            <Text>Exportar</Text>
                        </Button>
                    </View>

                    {/* Modal para agregar usuario */}
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogContent className="h-[70%] w-96">
                            <Text variant="h3" className="mb-4 text-center">
                                Agregar Nuevo Usuario
                            </Text>

                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 20 }}
                                keyboardShouldPersistTaps="handled"
                                className="flex-1">
                                <View className="gap-4">
                                    {/* Nombre */}
                                    <View>
                                        <Label>Nombre Completo *</Label>
                                        <Controller
                                            control={control}
                                            name="name"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    placeholder="Ej: Juan Pérez"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                        <FieldError error={errors.name?.message} />
                                    </View>

                                    {/* Edad y País */}
                                    <View className="flex-row gap-3">
                                        <View className="flex-1">
                                            <Label>Edad *</Label>
                                            <Controller
                                                control={control}
                                                name="age"
                                                render={({
                                                    field: { onChange, onBlur, value },
                                                }) => (
                                                    <Input
                                                        placeholder="25"
                                                        value={value.toString()}
                                                        onChangeText={(text) =>
                                                            onChange(parseInt(text) || 18)
                                                        }
                                                        onBlur={onBlur}
                                                        keyboardType="numeric"
                                                    />
                                                )}
                                            />
                                            <FieldError error={errors.age?.message} />
                                        </View>
                                        <View className="flex-1">
                                            <Label>País *</Label>
                                            <Controller
                                                control={control}
                                                name="country"
                                                render={({
                                                    field: { onChange, onBlur, value },
                                                }) => (
                                                    <Input
                                                        placeholder="Argentina"
                                                        value={value}
                                                        onChangeText={onChange}
                                                        onBlur={onBlur}
                                                    />
                                                )}
                                            />
                                            <FieldError error={errors.country?.message} />
                                        </View>
                                    </View>

                                    {/* Email */}
                                    <View>
                                        <Label>Email *</Label>
                                        <Controller
                                            control={control}
                                            name="email"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    placeholder="usuario@email.com"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                />
                                            )}
                                        />
                                        <FieldError error={errors.email?.message} />
                                    </View>

                                    {/* Teléfono y Ciudad */}
                                    <View className="flex-row gap-3">
                                        <View className="flex-1">
                                            <Label>Teléfono</Label>
                                            <Controller
                                                control={control}
                                                name="phone"
                                                render={({
                                                    field: { onChange, onBlur, value },
                                                }) => (
                                                    <Input
                                                        placeholder="+54 11 1234-5678"
                                                        value={value}
                                                        onChangeText={onChange}
                                                        onBlur={onBlur}
                                                        keyboardType="phone-pad"
                                                    />
                                                )}
                                            />
                                            <FieldError error={errors.phone?.message} />
                                        </View>
                                        <View className="flex-1">
                                            <Label>Ciudad *</Label>
                                            <Controller
                                                control={control}
                                                name="city"
                                                render={({
                                                    field: { onChange, onBlur, value },
                                                }) => (
                                                    <Input
                                                        placeholder="Buenos Aires"
                                                        value={value}
                                                        onChangeText={onChange}
                                                        onBlur={onBlur}
                                                    />
                                                )}
                                            />
                                            <FieldError error={errors.city?.message} />
                                        </View>
                                    </View>

                                    {/* Profesión */}
                                    <View>
                                        <Label>Profesión *</Label>
                                        <Controller
                                            control={control}
                                            name="profession"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    placeholder="Desarrollador Frontend"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                        <FieldError error={errors.profession?.message} />
                                    </View>

                                    {/* Empresa */}
                                    <View>
                                        <Label>Empresa</Label>
                                        <Controller
                                            control={control}
                                            name="company"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    placeholder="Tech Solutions SA"
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                />
                                            )}
                                        />
                                        <FieldError error={errors.company?.message} />
                                    </View>

                                    {/* Biografía */}
                                    <View>
                                        <Label>Biografía</Label>
                                        <Controller
                                            control={control}
                                            name="bio"
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Textarea
                                                    placeholder="Descripción breve del usuario..."
                                                    value={value}
                                                    onChangeText={onChange}
                                                    onBlur={onBlur}
                                                    style={{ minHeight: 80 }}
                                                />
                                            )}
                                        />
                                        <FieldError error={errors.bio?.message} />
                                    </View>

                                    {/* Botones */}
                                    <View className="mt-6 flex-row gap-3">
                                        <Button
                                            variant="outline"
                                            className="flex-1"
                                            onPress={handleCloseModal}
                                            disabled={isSubmitting}>
                                            <Text>Cancelar</Text>
                                        </Button>
                                        <Button
                                            variant="default"
                                            className="flex-1"
                                            onPress={handleSubmit(onSubmit)}
                                            disabled={isSubmitting}>
                                            <Text>{isSubmitting ? 'Guardando...' : 'Guardar'}</Text>
                                        </Button>
                                    </View>
                                </View>
                            </ScrollView>
                        </DialogContent>
                    </Dialog>
                </View>
            </KeyboardAware>
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
