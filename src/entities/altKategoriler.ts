import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Filmler } from './filmler';
import { Diziler } from './diziler';
import { Kategori } from './kategoriler';

@Entity("alt_kategoriler")
export class KategoriAlt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    adi: string;

    @UpdateDateColumn({ type: "timestamptz" })
    duzenlemeTarihi: Date;

    @DeleteDateColumn({ type: "timestamptz" })
    silmeTarihi: Date

    @CreateDateColumn({ type: "timestamptz" })
    eklenmeTarihi: Date

    @OneToMany(() => Filmler, (film) => film.altKategori)
    films: Filmler[]

    @OneToMany(() => Diziler, (dizi) => dizi.altKategori)
    diziler: Diziler[];

    @ManyToOne(() => Kategori, (kategori) => kategori.altKategoriler)
    kategori: Kategori

}

