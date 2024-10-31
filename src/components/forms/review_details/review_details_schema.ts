import { z } from 'zod';
import { Review_Types } from '@/types/ReviewTypes';

export const ReviewDetailsSchema = z.object({
  title: z.string(),
  type: z.enum(Review_Types),
  auto_save: z.boolean(),
  hide_maintenance: z.boolean(),
  hide_generalization: z.boolean(),
});
