import React from 'react';
import { Link } from 'react-router-dom';
import { obtenerOrdenes } from '../../utils/productos';

export default function AdminOrdenes() {
    const ordenes = obtenerOrdenes();
    return (
        <div>
            <h2>📋 Órdenes</h2>
            {ordenes.length === 0 ? (
                <div className="alert alert-info">No hay órdenes.</div>
            ) : ordenes.map(o => (
                <div key={o.id} className="card p-3 mb-2">
                    <div className="d-flex justify-content-between">
                        <div>
                            <strong>Orden #{o.id}</strong> - {o.fecha}<br />
                            👤 {o.cliente}<br />
                            💰 ${o.total.toLocaleString()}<br />
                            🛒 {o.productos.length} producto(s)
                        </div>
                        <Link to={`/admin/boleta/${o.id}`} className="btn btn-sm btn-outline-success align-self-center">
                            Ver boleta
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}