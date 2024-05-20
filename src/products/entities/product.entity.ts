import { Column, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Product {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    handle: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    sku: string;

    @Column()
    grams: string;

    @Column()
    stock: string;

    @Column()
    price: string;

    @Column()
    compare: string;

    @Column()
    barcode: string;

    @DeleteDateColumn()
    deletedAt: Date;
}
