import React from 'react';

export default function Footer() {
    return (
        <footer className="footer mt-5">
            <div className="footer-contenido">
                <div className="footer-columna">
                    <h3>🐾 TiendaDeMascotas</h3>
                    <p style={{ color: '#bec6bf' }}>Panel de administración</p>
                </div>
                <div className="footer-columna">
                    <h3>Acceso</h3>
                    <p style={{ color: '#bec6bf', fontSize: '13px' }}>
                        Solo administradores y vendedores
                    </p>
                </div>
                <div className="footer-columna">
                    <h3>Sistema</h3>
                    <p style={{ color: '#bec6bf', fontSize: '13px' }}>
                        React + Karma + Jasmine
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 TiendaDeMascotas — Admin Panel. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}