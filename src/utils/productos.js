export const productosBase = [
    { id: 1, codigo: "PROD001", nombre: "Rascador Premium", precio: 39990, precioOriginal: 49990, enOferta: true, imagen: "IMG/ProductosGato/SuperRascadorGato.png", descripcion: "Rascador resistente para gatos.", stock: 15, stockCritico: 5, categoria: "Rascadores y Gimnasios" },
    { id: 2, codigo: "PROD002", nombre: "Cerdito Oink", precio: 3990, precioOriginal: 3990, enOferta: false, imagen: "IMG/ProductosPerro/CerditoOinkOink.png", descripcion: "Juguete divertido para perros.", stock: 30, stockCritico: 5, categoria: "Juguetes" },
    { id: 3, codigo: "PROD003", nombre: "Arnés para Gato", precio: 9990, precioOriginal: 12990, enOferta: true, imagen: "IMG/ProductosGato/ArnesAjustableGato.png", descripcion: "Arnés ajustable y cómodo.", stock: 10, stockCritico: 3, categoria: "Correas, Collares y Arneses" },
    { id: 4, codigo: "PROD004", nombre: "Sobre Pedigree", precio: 800, precioOriginal: 800, enOferta: false, imagen: "IMG/ProductosPerro/SobreCarnePedigreeAdulto.png", descripcion: "Alimento húmedo para perros.", stock: 50, stockCritico: 10, categoria: "Alimento Húmedo" }
];

export const categorias = [
    { id: 1, nombre: "Alimento Seco" },
    { id: 2, nombre: "Alimento Húmedo" },
    { id: 3, nombre: "Juguetes" },
    { id: 4, nombre: "Rascadores y Gimnasios" },
    { id: 5, nombre: "Correas, Collares y Arneses" }
];

export const regiones = [
    { id: 1, nombre: "Región Metropolitana" },
    { id: 2, nombre: "Región de Valparaíso" },
    { id: 3, nombre: "Región del Biobío" },
    { id: 4, nombre: "Región de Coquimbo" },
    { id: 5, nombre: "Región de O'Higgins" }
];

export const comunas = {
    1: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "La Florida", "Maipú"],
    2: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"],
    3: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles"],
    4: ["La Serena", "Coquimbo", "Ovalle"],
    5: ["Rancagua", "San Fernando", "Santa Cruz"]
};

export function rutaImagen(img) {
    if (!img) return 'IMG/placeholder.png';
    return img.startsWith('/') ? img : `/${img}`;
}

export function validarEmail(email) {
    if (!email || email.length > 100) return false;
    const dominios = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
    return dominios.some(d => email.toLowerCase().endsWith(d));
}

export function validarRut(rut) {
    if (!rut || typeof rut !== 'string') return false;
    rut = rut.replace(/[.-]/g, '').trim();
    if (!/^[0-9]{6,8}[0-9Kk]$/.test(rut)) return false;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    let suma = 0, mult = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * mult;
        mult = mult < 7 ? mult + 1 : 2;
    }
    const dvE = 11 - (suma % 11);
    const dvC = dvE === 11 ? '0' : dvE === 10 ? 'K' : dvE.toString();
    return dv === dvC;
}


export function validarPassword(password) {
    if (!password || password.length < 4 || password.length > 10) {
        return { valido: false, error: 'Contraseña: 4-10 caracteres.' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valido: false, error: 'Contraseña: al menos una mayúscula.' };
    }
    if (!/[0-9]/.test(password)) {
        return { valido: false, error: 'Contraseña: al menos un número.' };
    }
    return { valido: true };
}


export function validarNombre(nombre, max = 50) {
    return !!nombre && nombre.length <= max;
}

// ============ LÓGICA DE NEGOCIO (funciones puras, testeables) ============

export function calcularTotal(carrito) {
    return carrito.reduce((s, p) => s + p.precio * p.cantidad, 0);
}

export function filtrarProductos(productos, { busqueda = '', categoria = '' } = {}) {
    return productos.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCat = !categoria || p.categoria === categoria;
        return coincideNombre && coincideCat;
    });
}

export function obtenerCriticos(productos) {
    return productos.filter(p => p.stock <= p.stockCritico);
}

export function obtenerOfertas(productos) {
    return productos.filter(p => p.enOferta === true);
}



export function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || productosBase;
}
export function guardarProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
}
export function crearProducto(datos) {
    const productos = obtenerProductos();
    const nuevoId = Math.max(...productos.map(p => p.id), 0) + 1;
    const nuevo = { ...datos, id: nuevoId };
    productos.push(nuevo);
    guardarProductos(productos);
    return nuevo;
}
export function actualizarProducto(id, datos) {
    const productos = obtenerProductos();
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return null;
    productos[index] = { ...productos[index], ...datos };
    guardarProductos(productos);
    return productos[index];
}
export function eliminarProducto(id) {
    const productos = obtenerProductos().filter(p => p.id !== id);
    guardarProductos(productos);
    return productos;
}



export function obtenerUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.length === 0) {
        usuarios.push({
            rut: "111111111", nombre: "Admin", apellidos: "Sistema",
            email: "admin@duoc.cl", password: "1234",
            region: "1", comuna: "Santiago", direccion: "Casa Matriz 1",
            tipo: "Administrador"
        });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    return usuarios;
}
export function guardarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
export function crearUsuario(datos) {
    const usuarios = obtenerUsuarios();
    usuarios.push(datos);
    guardarUsuarios(usuarios);
    return datos;
}
export function eliminarUsuario(email) {
    const usuarios = obtenerUsuarios().filter(u => u.email !== email);
    guardarUsuarios(usuarios);
    return usuarios;
}



export function obtenerOrdenes() {
    return JSON.parse(localStorage.getItem('ordenes')) || [];
}
export function guardarOrdenes(ordenes) {
    localStorage.setItem('ordenes', JSON.stringify(ordenes));
}
export function crearOrden(datos) {
    const ordenes = obtenerOrdenes();
    const nuevoId = ordenes.length > 0
        ? Math.max(...ordenes.map(o => o.id)) + 1
        : 1;
    const nueva = { ...datos, id: nuevoId };
    ordenes.push(nueva);
    guardarOrdenes(ordenes);
    return nueva;
}