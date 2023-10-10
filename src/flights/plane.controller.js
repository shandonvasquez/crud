
// flight.route.js
import { Router } from 'express';
import flightController from './flight.controller.js';

const router = Router();

router.post('/', flightController.createFlight);

router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlightById);
router.put('/:id', flightController.updateFlight);
router.delete('/:id', flightController.deleteFlight);

export default router;
