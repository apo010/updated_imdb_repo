import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Diziler } from "./diziler";
import { DiziBolumleri } from "./diziBolum";

@Entity()
export class DiziSezonlari {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Diziler, dizi => dizi.sezonlar)
    dizi: Diziler;

    @Column()
    sezonAdi: string

    @Column()
    bolumSayisi: number;

    @Column()
    cikisTarihi: Date;

    @UpdateDateColumn()
    duzenlemeTarihi: Date;

    @DeleteDateColumn()
    silmeTarihi: Date;

    @CreateDateColumn()
    eklenmeTarihi: Date;

    @OneToMany(() => DiziBolumleri, bolum => bolum.sezon)
    bolumler: DiziBolumleri[];
}