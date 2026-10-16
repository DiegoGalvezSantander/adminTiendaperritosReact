import React, { createContext, useContext, useState } from 'react';

const SesionContext = createContext();

export function SesionProvider({ children }) {
    const [sesion, setSesion] = useState(() => {
        return JSON.parse(localStorage.getItem('sesion')) || null;
    });

    const iniciar = (usuario) => {
        setSesion(usuario);
        localStorage.setItem('sesion', JSON.stringify(usuario));
    };

    
    const cerrarSesion = () => {
        setSesion(null);
        localStorage.removeItem('sesion');
    };

    return (
        <SesionContext.Provider value={{ sesion, iniciar, cerrarSesion }}>
            {children}
        </SesionContext.Provider>
    );
}

export const useSesion = () => useContext(SesionContext);
