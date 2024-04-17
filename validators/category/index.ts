import { z } from 'zod';

export const CategoryValidator = z.object({
    id: z.coerce.string().min(1, 'Cannot be empty.'),
    name: z.coerce.string().min(1, 'Cannot be empty.'),
});

export type ICategory = z.infer<typeof CategoryValidator>;