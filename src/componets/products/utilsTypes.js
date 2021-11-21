import { types } from "@babel/core"

export function utilFormating (values){
    const theNewDates = [values].reduce((acc, item)=>{
        console.warn('RRICE PRICE utilFormating--->', item.price)
        console.warn('purchase_note UTIL formating --->', item.purchase_note)
        acc['name'] = item.name,
        acc['catalog_visibility'] = !item.catalog_visibility.id ? item.catalog_visibility : item.catalog_visibility.id,
        acc['categories'] = [parseInt(item.categories.id)],
        acc['status']=item.status
        acc['featured']= item.featured
        acc['purchase_note'] = item.purchase_note.toString()
        acc['width'] = item.width
        acc['length'] = item.length
        acc['height'] = item.height
        acc['in_stock'] = item.in_stock
        acc['type']= !item.type.id ? item.type : item.type.id,
        acc['weight'] = item.weight,
        acc['manage_stock'] = item.manage_stock
        acc['description'] = item.description,
        acc['price'] = item.price.charAt(0) == '$' ? item.price.slice(1) * 1000 : item.price
        acc['regular_price'] = item.price.charAt(0) == '$' ? item.price.slice(1) * 1000 : item.price
        acc['backorders'] = item.backorders
        acc['stock_quantity'] = item.stock_quantity
        acc['backorders_allowed'] = true
    
        return acc
    },{})
    return theNewDates
 }

export function utilsFormatingWithImage(type, values, {featured, galery}){
    console.warn('FEtured REDUCER--->', featured, 'FOR TYPE----->', type)
    console.warn('Galery Reducer--->', galery,  'FOR TYPE----->', type)
        
    const theNewDates = [values].reduce((acc, item)=>{
        console.warn('RRICE PRICE--->', item.price)
        acc['name'] = item.name,
        acc['catalog_visibility'] = !item.catalog_visibility.id ? item.catalog_visibility : item.catalog_visibility.id,
        acc['categories'] = [parseInt(item.categories.id)],
        acc['status']=item.status
        acc['featured']= item.featured
        //
        acc['featured_image']= featured
        acc['gallery_images']= galery
        //
        acc['purchase_note'] = JSON.stringify(item.purchase_note)
        acc['width'] = item.width
        acc['length'] = item.length
        acc['height'] = item.height
        acc['in_stock'] = item.in_stock
        acc['type']= !item.type.id ? item.type : item.type.id,
        acc['weight'] = item.weight,
        acc['manage_stock'] = item.manage_stock
        acc['description'] = item.description,
        acc['price'] = item.price.charAt(0) == '$' ? item.price.slice(1) * 1000 : item.price 
        acc['regular_price'] = item.price.charAt(0) == '$' ? item.price.slice(1) * 1000 : item.price 
        acc['backorders'] = item.backorders
        acc['stock_quantity'] = item.stock_quantity
        acc['backorders_allowed'] = true
    
        return acc
    },{})

    return theNewDates
}
 
