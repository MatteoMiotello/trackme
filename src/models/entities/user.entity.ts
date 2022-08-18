import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Resource } from "./resource.entity";

@Entity('user')
export class User implements EntityInterface{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        nullable: false
    })
    password: string;

    @Column({
        default: null,
        nullable: true
    })
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    @UpdateDateColumn({
        select: false
    })
    updatedDate: Date;

    @CreateDateColumn({
        select: false
    })
    createdDate: Date;

    @OneToMany(type => Resource, resource => resource.user, {onDelete: 'CASCADE'})
    resources: Resource[];
}