import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import { Request } from "express";

export class IpLocation {
    @Column()
    range: [];

    @Column()
    country: string;

    @Column()
    region: string;

    @Column()
    timezone: string;

    @Column()
    city: string;

    @Column()
    ll: [];

    @Column()
    metro: number;

    @Column()
    area: number
}

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

    @Column((type) => IpLocation)
    location: IpLocation | null;

    @Column()
    request: object;

    @UpdateDateColumn()
    updatedDate: Date | null;

    @CreateDateColumn()
    createdDate: Date;
}