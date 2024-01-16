import  { useState, useEffect } from 'react';

const FechaDesdeAPI = () => {
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    const obtenerFechaDesdeAPI = () => {
      try {
        const fechaActual = new Date(Date.now());
        const opcionesDeFormato = { day: 'numeric', month: 'long', year: 'numeric' };
        const fechaFormateada = fechaActual.toLocaleDateString('es-ES', opcionesDeFormato);
        setFecha(fechaFormateada);
      } catch (error) {
        console.error('Error al obtener la fecha desde la API', error);
      }
    };

    obtenerFechaDesdeAPI();
  }, []);

  return (
    <div>
      <p>Resumen del día. {fecha}</p>
    </div>
  );
};

export default FechaDesdeAPI;