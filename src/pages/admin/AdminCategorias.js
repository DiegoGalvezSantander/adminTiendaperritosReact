import React, { useState } from 'react';
import { categorias as categoriasBase, obtenerProductos } from '../../utils/productos';

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState(() => {
        return JSON.parse(localStorage.getItem('categorias')) || categoriasBase;
    });
    const [editando, setEditando] = useState(null);
    const [nombre, setNombre] = useState('');
    const productos = obtenerProductos();

    const guardar = (nuevas) => {
        setCategorias(nuevas);
        localStorage.setItem('categorias', JSON.stringify(nuevas));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        if (editando) {
            const catVieja = categorias.find(c => c.id === editando);
            const nombreNuevo = nombre.trim();

            // ✅ Si el nombre cambió, actualizamos los productos que la usaban
            if (catVieja && catVieja.nombre !== nombreNuevo) {
                const productosActuales = obtenerProductos();
                const productosActualizados = productosActuales.map(p =>
                    p.categoria === catVieja.nombre ? { ...p, categoria: nombreNuevo } : p
                );
                localStorage.setItem('productos', JSON.stringify(productosActualizados));
            }

            const nuevas = categorias.map(c => c.id === editando ? { ...c, nombre: nombreNuevo } : c);
            guardar(nuevas);
            alert('✅ Categoría actualizada');
        } else {
            const nuevoId = Math.max(...categorias.map(c => c.id), 0) + 1;
            guardar([...categorias, { id: nuevoId, nombre: nombre.trim() }]);
            alert('✅ Categoría creada');
        }
        setNombre('');
        setEditando(null);
    };

    const handleEditar = (c) => {
        setEditando(c.id);
        setNombre(c.nombre);
    };

    const handleEliminar = (id) => {
        const cat = categorias.find(c => c.id === id);
        const enUso = productos.filter(p => p.categoria === cat.nombre).length;
        if (enUso > 0) {
            alert(`❌ No se puede eliminar. Hay ${enUso} producto(s) usando esta categoría.`);
            return;
        }
        if (!window.confirm('¿Eliminar categoría?')) return;
        guardar(categorias.filter(c => c.id !== id));
    };

    const handleCancelar = () => {
        setEditando(null);
        setNombre('');
    };

    return (
        <div>
            <h2>🏷️ Categorías</h2>
            <div className="card p-3 mb-4">
                <h5>{editando ? '✏️ Editar' : '➕ Nueva'} Categoría</h5>
                <form onSubmit={handleSubmit} className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre de la categoría"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-success">
                        {editando ? 'Actualizar' : 'Crear'}
                    </button>
                    {editando && (
                        <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <div className="card">
                <ul className="list-group list-group-flush">
                    {categorias.map(c => (
                        <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                <strong>{c.nombre}</strong>{' '}
                                <span className="badge bg-success ms-2">
                                    {productos.filter(p => p.categoria === c.nombre).length} productos
                                </span>
                            </span>
                            <div>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(c)}>✏️</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(c.id)}>✕</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}