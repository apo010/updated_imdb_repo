import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Kategori } from './kategoriler';
import { KategoriAlt } from './altKategoriler';

@Entity("filmler")
export class Filmler {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    adi: string;

    @Column()
    cikisTarihi: Date;

    @Column({ type: 'text', nullable: true })
    image_url: String;

    @CreateDateColumn({ type: "timestamptz" })
    eklenmeTarihi: Date;

    @Column()
    ozetBilgi: string;

    @Column()
    tanitimUrl: string;

    @UpdateDateColumn({ type: "timestamptz" })
    duzenlemeTarihi: Date;

    @DeleteDateColumn({ type: "timestamptz" })
    silmeTarihi: Date

    @Column()
    sonTarih: Date;

    @Column({ type: "decimal", precision: 10, scale: 1, default: 0 })
    imdbPuani: number;

    @Column({ default: 1 })
    durumu: number;

    @Column({ default: 0 })
    begenmeSayisi: number;

    @Column()
    kategoriId: number;

    @Column()
    altKategoriId: number;

    @Column({ default: 0 })
    begenmemeSayisi: number;

    @ManyToOne(() => Kategori, (kategori) => kategori.films)
    kategori: Kategori;

    @ManyToOne(() => KategoriAlt, (altKategori) => altKategori.films)
    @JoinColumn({ name: "alt_kategori_id" })
    altKategori: KategoriAlt;
}