import React, { useState } from 'react';
import {
    obtenerUsuarios,
    guardarUsuarios,
    crearUsuario,
    eliminarUsuario
} from '../../utils/productos';
import FormUsuario from '../../components/admin/FormUsuario';
import ListaUsuarios from '../../components/admin/ListaUsuarios';

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState(obtenerUsuarios());
    const [editando, setEditando] = useState(null); // guarda email original
    const [creando, setCreando] = useState(false);

    const refrescar = () => setUsuarios(obtenerUsuarios());

    const emailExiste = (email) => usuarios.some(u => u.email === email);

    const handleSubmit = (form) => {
        if (editando !== null) {
            const nuevos = usuarios.map(u =>
                u.email === editando ? { ...u, ...form } : u
            );
            setUsuarios(nuevos);
            guardarUsuarios(nuevos);
            alert('✅ Usuario actualizado');
        } else if (creando) {
            crearUsuario({ ...form, password: '1234' });
            refrescar();
            alert('✅ Usuario creado (contraseña por defecto: 1234)');
        }
        resetForm();
    };

    const resetForm = () => {
        setEditando(null);
        setCreando(false);
    };

    const handleEditar = (email) => {
        const u = usuarios.find(x => x.email === email);
        if (!u) return;
        setEditando(email);
        setCreando(false);
    };

    const handleEliminar = (email) => {
        if (!window.confirm('¿Eliminar?')) return;
        eliminarUsuario(email);
        refrescar();
    };

    const usuarioEditando = editando !== null
        ? usuarios.find(u => u.email === editando)
        : null;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>👤 Usuarios</h2>
                <button
                    className="btn btn-success"
                    onClick={() => { setEditando(null); setCreando(true); }}
                >
                    ➕ Nuevo Usuario
                </button>
            </div>

            {(editando !== null || creando) && (
                <FormUsuario
                    usuario={usuarioEditando}
                    onSubmit={handleSubmit}
                    onCancelar={resetForm}
                    emailExiste={emailExiste}
                />
            )}

            <ListaUsuarios
                usuarios={usuarios}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
            />
        </div>
    );
}