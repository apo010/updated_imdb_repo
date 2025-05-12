import { Entity, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, PrimaryColumn, OneToMany } from 'typeorm';
import { Kategori } from './kategoriler';
import { KategoriAlt } from './altKategoriler';
import { DiziSezonlari } from './diziSezon';
import { DiziBolumleri } from './diziBolum';

@Entity("diziler")
export class Diziler {
    @PrimaryColumn()
    id: number;

    @Column()
    adi: String;

    @Column({ type: 'text', nullable: true })
    image_url: String;

    @Column({ type: 'int2', nullable: true })
    episodes: number;

    @Column()
    cikisTarihi: Date;

    @CreateDateColumn({ type: "timestamptz" })
    eklenmeTarihi: Date;

    @Column()
    ozetBilgi: String;

    @Column()
    tanitimUrl: String;

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

    @Column({ default: 0 })
    begenmemeSayisi: number;

    @Column()
    kategoriId: number

    @Column()
    altKategoriId: number

    @ManyToOne(() => Kategori, (kategori) => kategori.diziler)
    kategori: Kategori;

    @ManyToOne(() => KategoriAlt, (altKategori) => altKategori.diziler)
    altKategori: KategoriAlt;

    @OneToMany(() => DiziSezonlari, (sezonlar) => sezonlar.dizi)
    sezonlar: DiziSezonlari[];

    @OneToMany(() => DiziBolumleri, (bolumler) => bolumler.dizi)
    bolumler: DiziBolumleri[];

}