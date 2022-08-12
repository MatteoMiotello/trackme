import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { type } from "os";
import { Resource } from "./resource.entity";

@Entity('user')
export class User implements EntityInterface{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    email: string;

    @Column({
        nullable: false,
        select: false
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

    @UpdateDateColumn()
    updatedDate: Date;

    @CreateDateColumn()
    createdDate: Date;

    @OneToMany(type => Resource, resource => resource.user, {onDelete: 'CASCADE'})
    resources: Resource[];
}