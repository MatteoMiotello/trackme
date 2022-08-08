import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { TableColumnFactory } from "./support/factories/table-column.factory";
import { PostgresDataType } from "./support/dataTypes/postgres-data-type";

export class User1659977855302 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: 'user',
            columns: [
                TableColumnFactory.generatePkColumn( 'user' ),
                TableColumnFactory.generateColumn( 'firstName', PostgresDataType.string, {
                    isNullable: true
                } ),
                TableColumnFactory.generateColumn( 'lastName', PostgresDataType.string, {
                    isNullable: true
                } ),
                TableColumnFactory.generateColumn( 'email', PostgresDataType.string, {
                    isNullable: true,
                    default: null
                } ),
                TableColumnFactory.generateColumn( 'password', PostgresDataType.string, {
                    isNullable: false
                } ),
                TableColumnFactory.generateColumn( 'isActive', PostgresDataType.boolean, {
                    default: true,
                    isNullable: false,
                } ),
                TableColumnFactory.generateUpdateDateColumn(),
                TableColumnFactory.generateCreatedDateColumn()
            ]
        } ) )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
