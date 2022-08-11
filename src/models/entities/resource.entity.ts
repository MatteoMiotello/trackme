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
import { User } from "./user.entity";
import {v4 as uuidv4} from 'uuid';
import { TokenizeInterface } from "../Interfaces/tokenize.interface";

@Entity('resource')
export class Resource implements TokenizeInterface{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false
    })
    userId: number;

    @ManyToOne(type => User, user => user.resources, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
    user: User;

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