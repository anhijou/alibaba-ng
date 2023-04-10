export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;

    public constructor(id: number, name: string, description: string, price: number, category: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
    }
}
