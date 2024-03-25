import ProductDto from "../DTOs/product.dto.js";

export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    // Obtiene todos los productos
    getProducts = async () => {
        const products = await this.dao.getAll(); // Cambiado 'carts' a 'products'
        return products;
    }

    // Agrega un producto
    addProduct = async (product) => {
        const productToCreate = new ProductDto(product); // Cambiado 'ProductToCreate' a 'productToCreate'
        const result = await this.dao.save(productToCreate);
        return result;
    }

    // Obtiene un producto por su id
    getProductById = async (productId) => {
        const product = await this.dao.getById(productId);
        return product;
    }

    // Actualiza un producto
    updateProduct = async (id, updatedFields) => {
        const result = await this.dao.update(id, updatedFields);
        return result;
    }

    // Elimina un producto
    deleteProduct = async (productId) => {
        const result = await this.dao.delete(productId);
        return result;
    }
}
