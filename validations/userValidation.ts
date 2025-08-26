import { z } from 'zod';

// Schema de validación para usuarios
export const userSchema = z.object({
    name: z
        .string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder 50 caracteres')
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
    age: z
        .number()
        .min(18, 'La edad mínima es 18 años')
        .max(100, 'La edad máxima es 100 años')
        .int('La edad debe ser un número entero'),
    country: z
        .string()
        .min(2, 'El país debe tener al menos 2 caracteres')
        .max(30, 'El país no puede exceder 30 caracteres'),
    email: z
        .string()
        .email('Ingrese un email válido')
        .max(100, 'El email no puede exceder 100 caracteres'),
    phone: z
        .string()
        .min(10, 'El teléfono debe tener al menos 10 dígitos')
        .max(20, 'El teléfono no puede exceder 20 caracteres')
        .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Formato de teléfono inválido')
        .or(z.literal('')),
    city: z
        .string()
        .min(2, 'La ciudad debe tener al menos 2 caracteres')
        .max(50, 'La ciudad no puede exceder 50 caracteres'),
    profession: z
        .string()
        .min(2, 'La profesión debe tener al menos 2 caracteres')
        .max(100, 'La profesión no puede exceder 100 caracteres'),
    company: z.string().max(100, 'La empresa no puede exceder 100 caracteres').or(z.literal('')),
    bio: z.string().max(500, 'La biografía no puede exceder 500 caracteres').or(z.literal('')),
    status: z.enum(['Activo', 'Inactivo']),
});

// Tipo inferido del schema
export type UserFormData = z.infer<typeof userSchema>;

// Valores por defecto para el formulario
export const defaultUserValues: UserFormData = {
    name: '',
    age: 18,
    country: '',
    email: '',
    phone: '',
    city: '',
    profession: '',
    company: '',
    bio: '',
    status: 'Activo',
};
