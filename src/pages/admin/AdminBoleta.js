import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { obtenerOrdenes } from '../../utils/productos';

export default function AdminBoleta() {
    const { id } = useParams();
    const orden = obtenerOrdenes().find(o => o.id === parseInt(id));
    if (!orden) return <div className="alert alert-danger">Boleta no encontrada.</div>;

    return (
        <div>
            <h2>🧾 Boleta Orden #{orden.id}</h2>
            <div className="card p-4" style={{ maxWidth: '700px' }}>
                <div className="text-center mb-3">
                    <h4>🐾 TiendaDeMascotas</h4>
                    <p className="text-muted mb-0">RUT: 76.123.456-7</p>
                    <p className="text-muted">Casa Matriz 1, Santiago</p>
                </div>
                <hr />
                <p><strong>N° Orden:</strong> {orden.id}</p>
                <p><strong>Fecha:</strong> {orden.fecha}</p>
                <p><strong>Cliente:</strong> {orden.cliente}</p>
                <p><strong>Email:</strong> {orden.email}</p>
                <p><strong>Dirección:</strong> {orden.direccion}</p>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cant.</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orden.productos.map(p => (
                            <tr key={p.id}>
                                <td>{p.nombre}</td>
                                <td>{p.cantidad}</td>
                                <td>${p.precio.toLocaleString()}</td>
                                <td>${(p.precio * p.cantidad).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-end">
                    <h4>Total: ${orden.total.toLocaleString()}</h4>
                </div>
                <hr />
                <div className="d-flex gap-2">
                    <Link to="/admin/ordenes" className="btn btn-outline-secondary">← Volver</Link>
                    <button onClick={() => window.print()} className="btn btn-success">🖨️ Imprimir</button>
                </div>
            </div>
        </div>
    );
}