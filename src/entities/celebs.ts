import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("celebs")
export class Celebs {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    discography: string;

    @Column()
    birthday: Date;

    @Column()
    height: number;

    @Column({ type: 'text', nullable: true })
    image: String;
}