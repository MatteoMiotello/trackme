import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import { Request } from "express";

@Entity( 'resource_log' )
export class ResourceLogEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({
        nullable: false
    })
    resourceToken: string;

    @Column()
    userAgent: string;

    @Column()
    remoteIp: string;

    @Column()
    location: object | null;

    @Column()
    request: object;

    @UpdateDateColumn()
    updatedDate: Date | null;

    @CreateDateColumn()
    createdDate: Date;
}