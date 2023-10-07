'use client'
import React, { useState } from 'react';

const FormulariosMultiples = () => {
  const numFormularios = 6; // Cambia el número según la cantidad deseada de formularios
  const [datosFormularios, setDatosFormularios] = useState(
    Array(numFormularios).fill({ nombre: '', email: '' })
  );

  const handleInputChange = (event:any, index:any) => {
    const { name, value } = event.target;
    const nuevosDatos = [...datosFormularios];
    nuevosDatos[index] = {
      ...nuevosDatos[index],
      [name]: value,
    };
    setDatosFormularios(nuevosDatos);
  };

  const enviarTodosLosDatos = (event:any) => {
    event.preventDefault();
    console.log('Datos de todos los formularios:', datosFormularios);
  };

  const formularios = [];

  for (let i = 0; i < numFormularios; i++) {
    formularios.push(
      <form key={i}>
        <h2>Formulario {i + 1}</h2>
        <div>
          <label htmlFor={`nombre${i}`}>Nombre:</label>
          <input
            type="text"
            id={`nombre${i}`}
            name="nombre"
            value={datosFormularios[i].nombre}
            onChange={(e) => handleInputChange(e, i)}
          />
        </div>
        <div>
          <label htmlFor={`email${i}`}>Email:</label>
          <input
            type="text"
            id={`email${i}`}
            name="email"
            value={datosFormularios[i].email}
            onChange={(e) => handleInputChange(e, i)}
          />
        </div>
      </form>
    );
  }

  return (
    <div>
      <h1>Formularios Múltiples</h1>
      {formularios}
      <button onClick={enviarTodosLosDatos}>Enviar Todos los Datos</button>
    </div>
  );
};

export default FormulariosMultiples;
