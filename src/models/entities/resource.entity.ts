import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { UserEntity } from "./user.entity";
import {v4 as uuidv4} from 'uuid';
import { TokenizeEntity } from "../Interfaces/TokenizeEntity";

@Entity('resource')
export class ResourceEntity implements TokenizeEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    userId: number;

    @ManyToOne(type => UserEntity, user => user.resources, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: UserEntity;

    @Column({
        nullable: false
    })
    token: string;

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

    @BeforeInsert()
    beforeInsert() {
        this.token = uuidv4();
    }
}