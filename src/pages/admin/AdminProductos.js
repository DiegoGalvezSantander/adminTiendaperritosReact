import React, { useState } from 'react';
import {
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../../utils/productos';
import FormProducto from '../../components/admin/FormProducto';
import ListaProductos from '../../components/admin/ListaProductos';

export default function AdminProductos() {
    const [productos, setProductos] = useState(obtenerProductos());
    const [editando, setEditando] = useState(null);

    const refrescar = () => setProductos(obtenerProductos());

    const existeCodigo = (codigo) =>
        productos.some(p => p.codigo.toLowerCase() === codigo.trim().toLowerCase());

    const handleSubmit = (datos) => {
        if (editando) {
            actualizarProducto(editando.id, datos);
            alert('✅ Producto actualizado');
        } else {
            crearProducto(datos);
            alert('✅ Producto creado');
        }
        refrescar();
        setEditando(null);
    };

    const handleEliminar = (id) => {
        if (!window.confirm('¿Eliminar?')) return;
        eliminarProducto(id);
        refrescar();
    };

    return (
        <div>
            <h2>📦 Productos</h2>
            <FormProducto
                producto={editando}
                onSubmit={handleSubmit}
                onCancelar={() => setEditando(null)}
                existeCodigo={existeCodigo}
            />
            <ListaProductos
                productos={productos}
                onEditar={setEditando}
                onEliminar={handleEliminar}
            />
        </div>
    );
}