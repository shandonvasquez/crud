import Flight from './flight.model.js'; // Importa el modelo de vuelo

// Crear un vuelo
const createFlight = async (req, res) => {
  try {
    const newFlight = await Flight.create(req.body); // Crea un nuevo vuelo en la base de datos
    res.status(201).json(newFlight); // Responde con el nuevo vuelo creado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el vuelo' });
  }
};

// Obtener todos los vuelos
const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.findAll(); // Obtiene todos los vuelos de la base de datos
    res.status(200).json(flights); // Responde con la lista de vuelos
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los vuelos' });
  }
};

// Obtener un vuelo por ID
const getFlightById = async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findByPk(id); // Busca el vuelo por ID en la base de datos
    if (!flight) {
      res.status(404).json({ message: 'Vuelo no encontrado' });
      return;
    }
    res.status(200).json(flight); // Responde con el vuelo encontrado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el vuelo por ID' });
  }
};

// Actualizar un vuelo por ID
const updateFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findByPk(id); // Busca el vuelo por ID en la base de datos
    if (!flight) {
      res.status(404).json({ message: 'Vuelo no encontrado' });
      return;
    }
    await flight.update(req.body); // Actualiza el vuelo con los datos proporcionados
    res.status(200).json(flight); // Responde con el vuelo actualizado
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el vuelo por ID' });
  }
};

// Eliminar un vuelo por ID
const deleteFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const flight = await Flight.findByPk(id); // Busca el vuelo por ID en la base de datos
    if (!flight) {
      res.status(404).json({ message: 'Vuelo no encontrado' });
      return;
    }
    await flight.destroy(); // Elimina el vuelo de la base de datos
    res.status(204).json(); // Responde con un código 204 (Sin contenido)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el vuelo por ID' });
  }
};

export default {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
};
