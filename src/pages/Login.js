import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSesion } from '../context/SesionContext';
import { validarEmail, obtenerUsuarios } from '../utils/productos';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const { iniciar } = useSesion();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!validarEmail(email)) {
            setError('❌ Email inválido.');
            return;
        }
        if (pass.length < 4 || pass.length > 10) {
            setError('❌ Contraseña: 4-10 caracteres.');
            return;
        }

        const usuario = obtenerUsuarios().find(u => u.email === email && u.password === pass);
        if (!usuario) {
            setError('❌ Credenciales incorrectas.');
            return;
        }

        if (usuario.tipo !== 'Administrador' && usuario.tipo !== 'Vendedor') {
            setError('❌ Solo administradores y vendedores pueden acceder.');
            return;
        }

        iniciar({ email: usuario.email, nombre: usuario.nombre, rol: usuario.tipo });
        alert('✅ Bienvenido ' + usuario.nombre);
        navigate('/admin');
    };

    return (
        <main className="container py-5">
            <div className="card p-4 mx-auto shadow-sm" style={{ maxWidth: '480px' }}>
                <h2 className="text-center mb-4">🔐 Acceso Administrador</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email *</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="admin@duoc.cl"
                            required
                        />
                        <small className="text-muted">Solo @duoc.cl, @profesor.duoc.cl o @gmail.com</small>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Contraseña *</label>
                        <input
                            type="password"
                            className="form-control"
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">Ingresar</button>
                </form>
                <div className="alert alert-info mt-3 small text-center mb-0">
                    Credenciales por defecto: <strong>admin@duoc.cl / 1234</strong>
                </div>
            </div>
        </main>
    );
}