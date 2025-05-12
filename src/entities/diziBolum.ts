import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { Diziler } from './diziler';
import { DiziSezonlari } from './diziSezon';

@Entity()
export class DiziBolumleri {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bolumAdi: number;

    @Column()
    cikisTarihi: Date;

    @UpdateDateColumn({ type: "timestamptz" })
    duzenlemeTarihi: Date;

    @DeleteDateColumn({ type: "timestamptz" })
    silmeTarihi: Date

    @CreateDateColumn({ type: "timestamptz" })
    eklenmeTarihi: Date;

    @Column()
    sezonId: number;

    @ManyToOne(() => Diziler, (dizi) => dizi.bolumler)
    dizi: Diziler;

    @ManyToOne(() => DiziSezonlari, (sezon) => sezon.bolumler)
    sezon: DiziSezonlari;
}