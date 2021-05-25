export default {
    'menu': {
        'user' : [
            {caption: 'Inicio', link: 'home'},
            {caption: 'Fichas de costo', link: 'costsheet'},
            {caption: 'Elementos', link: 'element'},
            {caption: 'Configuración', link: 'configuration'},
        ],
        'admin' : [
            {caption: 'Inicio', link: 'home'},
            {caption: 'Fichas de costo', link: 'costsheet'},
            {caption: 'Elementos', link: 'element'},
            {caption: 'Configuración', link: 'configuration'},
            {caption: 'Usuarios', link: 'user'},
        ],
        'sa': [
            {caption: 'Empresas', link: 'enterprise'},
            {caption: 'Usuarios', link: 'user'},
        ]
    },
    apiUrl: 'http://localhost:3002/',
    paginationSize: 8, // Pages to show to left or right of current page
    itemsPerPage: 4
}