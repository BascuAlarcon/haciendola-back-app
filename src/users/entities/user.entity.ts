import { Column, Entity } from "typeorm";

@Entity()
export class User {

    @Column({ primary: true, generated: true })
    id: number;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;
}
