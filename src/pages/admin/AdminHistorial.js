import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { obtenerOrdenes } from '../../utils/productos';

export default function AdminHistorial() {
    const ordenes = obtenerOrdenes();
    const [busqueda, setBusqueda] = useState('');
    const [usuarioFiltro, setUsuarioFiltro] = useState('');

    const usuariosUnicos = [...new Set(ordenes.map(o => o.email))];

    const filtradas = ordenes.filter(o => {
        const coincideBusqueda =
            o.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
            o.email.toLowerCase().includes(busqueda.toLowerCase());
        const coincideUsuario = !usuarioFiltro || o.email === usuarioFiltro;
        return coincideBusqueda && coincideUsuario;
    });

    const totalFiltrado = filtradas.reduce((s, o) => s + o.total, 0);

    return (
        <div>
            <h2>📜 Historial de Compras</h2>

            <div className="row g-2 mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="🔍 Buscar cliente o email..."
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <select
                        className="form-select"
                        value={usuarioFiltro}
                        onChange={e => setUsuarioFiltro(e.target.value)}
                    >
                        <option value="">Todos los usuarios</option>
                        {usuariosUnicos.map(email => (
                            <option key={email} value={email}>{email}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="alert alert-info">
                <strong>Total de compras:</strong> {filtradas.length} | <strong>Monto total:</strong> ${totalFiltrado.toLocaleString()}
            </div>

            {filtradas.length === 0 ? (
                <div className="alert alert-warning">No hay compras que coincidan.</div>
            ) : (
                filtradas.map(o => (
                    <div key={o.id} className="card p-3 mb-2">
                        <div className="d-flex justify-content-between">
                            <div>
                                <strong>Orden #{o.id}</strong> - {o.fecha}
                                <br />
                                👤 {o.cliente} ({o.email})
                                <br />
                                💰 ${o.total.toLocaleString()} | 🛒 {o.productos.length} producto(s)
                            </div>
                            <Link to={`/admin/boleta/${o.id}`} className="btn btn-sm btn-outline-success align-self-center">
                                Ver boleta
                            </Link>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}