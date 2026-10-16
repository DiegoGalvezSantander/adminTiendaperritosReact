import React from 'react';
import { Link } from 'react-router-dom';
import { obtenerOrdenes, obtenerProductos } from '../../utils/productos';

export default function AdminReportes() {
    const ordenes = obtenerOrdenes();
    const productos = obtenerProductos();
    const totalVentas = ordenes.reduce((s, o) => s + o.total, 0);
    const criticos = productos.filter(p => p.stock <= p.stockCritico);

    
    const ventasPorProducto = {};
    ordenes.forEach(o => {
        o.productos.forEach(p => {
            if (!ventasPorProducto[p.nombre]) {
                ventasPorProducto[p.nombre] = { nombre: p.nombre, cantidad: 0, total: 0 };
            }
            ventasPorProducto[p.nombre].cantidad += p.cantidad;
            ventasPorProducto[p.nombre].total += p.cantidad * p.precio;
        });
    });
    const topProducto = Object.values(ventasPorProducto)
        .sort((a, b) => b.cantidad - a.cantidad)[0];

    
    const ventasPorCategoria = {};
    ordenes.forEach(o => {
        o.productos.forEach(p => {
            const prod = productos.find(x => x.id === p.id);
            const cat = prod?.categoria || 'Sin categoría';
            if (!ventasPorCategoria[cat]) ventasPorCategoria[cat] = 0;
            ventasPorCategoria[cat] += p.cantidad;
        });
    });
    const topCategoria = Object.entries(ventasPorCategoria)
        .sort((a, b) => b[1] - a[1])[0];

    const ticketPromedio = ordenes.length > 0 ? totalVentas / ordenes.length : 0;

    return (
        <div>
            <h2>📈 Reportes</h2>

            <div className="row g-3 mb-4">
                <div className="col-md-3">
                    <div className="card p-3 text-center">
                        <small className="text-muted">Total de ventas</small>
                        <h4>${totalVentas.toLocaleString()}</h4>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 text-center">
                        <small className="text-muted">Órdenes</small>
                        <h4>{ordenes.length}</h4>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 text-center">
                        <small className="text-muted">Ticket promedio</small>
                        <h4>${Math.round(ticketPromedio).toLocaleString()}</h4>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card p-3 text-center">
                        <small className="text-muted">Productos críticos</small>
                        <h4>{criticos.length}</h4>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <div className="card p-3">
                        <h5>🏆 Producto más vendido</h5>
                        {topProducto ? (
                            <>
                                <p className="mb-0"><strong>{topProducto.nombre}</strong></p>
                                <small className="text-muted">
                                    {topProducto.cantidad} unidades — ${topProducto.total.toLocaleString()}
                                </small>
                            </>
                        ) : (
                            <p className="text-muted mb-0">Sin datos</p>
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card p-3">
                        <h5>📂 Categoría más vendida</h5>
                        {topCategoria ? (
                            <>
                                <p className="mb-0"><strong>{topCategoria[0]}</strong></p>
                                <small className="text-muted">{topCategoria[1]} unidades vendidas</small>
                            </>
                        ) : (
                            <p className="text-muted mb-0">Sin datos</p>
                        )}
                    </div>
                </div>
            </div>

            {criticos.length > 0 && (
                <div className="alert alert-warning">
                    <h5>Productos con stock crítico:</h5>
                    {criticos.map(p => <p key={p.id} className="mb-0">⚠️ {p.nombre} - Stock: {p.stock}</p>)}
                    <Link to="/admin/productos-criticos" className="btn btn-sm btn-warning mt-2">
                        Ver todos los productos críticos
                    </Link>
                </div>
            )}
        </div>
    );
}
