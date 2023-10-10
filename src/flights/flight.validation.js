import { z } from 'zod';

export const flightSchema = z.object({
  origin_id: z.number().int().positive().min(1),
  destination_id: z.number().int().positive().min(1),
  plane_id: z.number().int().positive().min(1).optional(),
  departure_time: z.string().timestamp(),
  check_in: z.string().timestamp().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

export const validateFlight = (req, res, next) => {
  try {
    flightSchema.parse(req.body); 
    next(); 
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Datos de vuelo no válidos' });
  }
};
