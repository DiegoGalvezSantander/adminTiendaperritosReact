import React from 'react';
import { Link } from 'react-router-dom';
import { obtenerProductos } from '../../utils/productos';

export default function AdminProductosCriticos() {
    const productos = obtenerProductos();
    const criticos = productos.filter(p => p.stock <= p.stockCritico);

    return (
        <div>
            <h2>⚠️ Productos con Stock Crítico</h2>
            <p className="text-muted">Productos que necesitan reposición urgente</p>
            {criticos.length === 0 ? (
                <div className="alert alert-success">✅ No hay productos con stock crítico</div>
            ) : (
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {criticos.map(p => (
                            <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{p.nombre}</strong>
                                    <br />
                                    <small className="text-muted">Stock actual: {p.stock} / Crítico: {p.stockCritico}</small>
                                </div>
                                <Link to="/admin/productos" className="btn btn-sm btn-warning">📦 Reponer</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="mt-3">
                <Link to="/admin/reportes" className="btn btn-outline-secondary">← Volver a Reportes</Link>
            </div>
        </div>
    );
}