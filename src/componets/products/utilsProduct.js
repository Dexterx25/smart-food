


export function extructuringVisibility(data){
switch (data) {
    case 'visible':
        return 'Visible'
        break;
    case 'catalog':
        return 'En catalogo'
        break;
    case 'hidden':
        return 'Oculto'
        break
    case 'search':
        return 'Solo en los resultados de busqueda'
        break;
    default:
        break;
}
}
export function extructuFeatured(data){
    switch (data) {
        case true:
            return 'Destacado'
            break;
        case false:
            return 'No destacado'
            break;
        default:
            break;
    }
}
export function extructurState(data){
    switch (data) {
        case 'publish':
            return 'Publicado'
            break;
        case 'draft':
            return 'Borrador'
            break;
        case 'pending':
            return 'Pendiente'
            break;
        default:
            break;
    }
}
export function extructureInStock(data){
    switch (data) {
        case true:
            return 'En Stock'
            break;
        case false:
            return 'Fuera de Stock'
            break;
        default:
            break;
    }
}
export function extructureMangeStock(data){
    switch (data) {
        case true:
            return  'Manejar Stock'            
            break;
        case false:
            return 'No manejar Stock'
        default:
            break;
    }
}
export function extructureBackordersState(data){
    switch (data) {
        case 'no':
            return 'No Permitir'
            break;
        case 'notify':
            return 'Permitir pero notificar al cliente'
            break;
        case 'yes':
            return 'Permitir'
            break;
            
        default:
            break;
    }
}
export function extructuringType(data){
switch (data) {
    case 'simple':
        return 'Simple'
        break;
    case 'variable':
        return 'Variable'
        break;
    case 'grouped':
        return 'Agrupado'
    case 'external':
        return 'Externo'
        break
    default:
        break;
}
}
export function extructuringCategory(data){

}