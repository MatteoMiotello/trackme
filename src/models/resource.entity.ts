import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('resource')
export class ResourceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    userId: number;

    @ManyToOne(type => UserEntity, user => user.resources, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'occupancyId', referencedColumnName: 'id' })
    user: UserEntity;

    @Column({
        nullable: false
    })
    content: string;

    @Column({
        nullable: false,
        default: true
    })
    isActive: boolean;

    @UpdateDateColumn()
    updatedDate: Date | null;

    @CreateDateColumn()
    createdDate: Date;
}