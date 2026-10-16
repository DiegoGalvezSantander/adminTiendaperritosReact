import { 
    obtenerUsuarios, 
    obtenerProductos, 
    obtenerOrdenes,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    crearUsuario,
    eliminarUsuario,
    guardarProductos,
    guardarUsuarios,
    guardarOrdenes
} from '../utils/productos';

describe('Cobertura - Usuarios', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('obtenerUsuarios crea admin por defecto', () => {
        const usuarios = obtenerUsuarios();
        expect(usuarios.length).toBeGreaterThan(0);
        expect(usuarios[0].email).toBe('admin@duoc.cl');
    });

    it('crearUsuario agrega un usuario nuevo', () => {
        const inicial = obtenerUsuarios().length;
        crearUsuario({
            rut: '222222222',
            nombre: 'Test',
            apellidos: 'User',
            email: 'test@duoc.cl',
            password: '1234',
            tipo: 'Cliente'
        });
        expect(obtenerUsuarios().length).toBe(inicial + 1);
    });

    it('eliminarUsuario remueve por email', () => {
        obtenerUsuarios(); // asegura admin
        crearUsuario({
            rut: '333333333', nombre: 'Eliminar', apellidos: 'Test',
            email: 'eliminar@duoc.cl', password: '1234', tipo: 'Cliente'
        });
        eliminarUsuario('eliminar@duoc.cl');
        const usuarios = obtenerUsuarios();
        expect(usuarios.find(u => u.email === 'eliminar@duoc.cl')).toBeUndefined();
    });
});

describe('Cobertura - Productos', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('obtenerProductos retorna productos base', () => {
        const productos = obtenerProductos();
        expect(productos.length).toBeGreaterThan(0);
    });

    it('crearProducto agrega un producto con ID único', () => {
        const inicial = obtenerProductos().length;
        const nuevo = crearProducto({
            codigo: 'TEST001',
            nombre: 'Producto Test',
            precio: 1000,
            stock: 10,
            stockCritico: 2,
            categoria: 'Juguetes',
            imagen: 'x.png',
            descripcion: 'test'
        });
        expect(nuevo.id).toBeDefined();
        expect(obtenerProductos().length).toBe(inicial + 1);
    });

    it('actualizarProducto modifica los datos', () => {
        const productos = obtenerProductos();
        const primero = productos[0];
        actualizarProducto(primero.id, { ...primero, nombre: 'Modificado' });
        const actualizado = obtenerProductos().find(p => p.id === primero.id);
        expect(actualizado.nombre).toBe('Modificado');
    });

    it('eliminarProducto remueve por ID', () => {
        const inicial = obtenerProductos().length;
        const productos = obtenerProductos();
        eliminarProducto(productos[0].id);
        expect(obtenerProductos().length).toBe(inicial - 1);
    });

    it('guardarProductos persiste correctamente', () => {
        const productos = obtenerProductos();
        const copia = [...productos, { id: 999, nombre: 'Extra', precio: 1, stock: 1, stockCritico: 0, categoria: 'X', imagen: 'x.png' }];
        guardarProductos(copia);
        expect(obtenerProductos().length).toBe(copia.length);
    });
});

describe('Cobertura - Órdenes', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('obtenerOrdenes retorna array vacío al inicio', () => {
        const ordenes = obtenerOrdenes();
        expect(Array.isArray(ordenes)).toBe(true);
        expect(ordenes.length).toBe(0);
    });

    it('guardarOrdenes y obtenerOrdenes trabajan juntos', () => {
        const ordenes = [{ id: 1, cliente: 'Test', total: 1000, productos: [] }];
        guardarOrdenes(ordenes);
        expect(obtenerOrdenes().length).toBe(1);
    });
});