import { Router } from 'express';
import flightController from './flight.controller.js';
import { validateFlight } from './flight.validation.js';

const router = Router();

// Rutas para vuelos
router.post('/', validateFlight, flightController.createFlight); // Crear un vuelo
router.get('/', flightController.getAllFlights); // Obtener todos los vuelos
router.get('/:id', flightController.getFlightById); // Obtener un vuelo por ID
router.put('/:id', validateFlight, flightController.updateFlight); // Actualizar un vuelo por ID
router.delete('/:id', flightController.deleteFlight); // Eliminar un vuelo por ID

export default router;
