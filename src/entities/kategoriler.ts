import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';
import { Filmler } from './filmler';
import { Diziler } from './diziler';
import { KategoriAlt } from './altKategoriler';

@Entity("kategoriler")
export class Kategori {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    adi: string;

    @UpdateDateColumn({ type: "timestamptz" })
    duzenlemeTarihi: Date;

    @DeleteDateColumn({ type: "timestamptz" })
    silmeTarihi: Date

    @CreateDateColumn({ type: "timestamptz" })
    eklenmeTarihi: Date;

    @OneToMany(() => Filmler, (film) => film.kategori)
    films: Filmler[];

    @OneToMany(() => Diziler, (dizi) => dizi.kategori)
    diziler: Diziler[];

    @OneToMany(() => KategoriAlt, (altKategori) => altKategori.kategori)
    altKategoriler: Kategori[];
}