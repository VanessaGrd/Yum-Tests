import { ColorPalette } from '@/validators/tag';
import { z } from 'zod';

export const CreateTagSchema = z.object({
    name: z.string().optional(),
    color: z.nativeEnum(ColorPalette).optional(),  
});
