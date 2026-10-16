import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSesion } from '../context/SesionContext';

export default function Header() {
    const { sesion, cerrarSesion } = useSesion();
    const navigate = useNavigate();

    const handleCerrarSesion = () => {
        cerrarSesion();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
            <div className="container">
                <Link to="/admin" className="navbar-brand d-flex align-items-center gap-2" aria-label="Ir al panel admin">
                    <span style={{ fontSize: '24px' }} aria-hidden="true">🐾</span>
                    <div>
                        <div style={{ fontWeight: 'bold', color: '#334b36', lineHeight: 1 }}>TiendaDeMascotas</div>
                        <small style={{ fontSize: '11px', color: '#777' }}>Panel Administrador</small>
                    </div>
                </Link>
                {sesion && (
                    <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small">👤 {sesion.nombre} ({sesion.rol})</span>
                        <button
                            onClick={handleCerrarSesion}
                            className="btn btn-outline-danger btn-sm"
                            aria-label="Cerrar sesión"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}