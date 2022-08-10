import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { TableColumnFactory } from "./support/factories/table-column.factory";
import { PostgresDataType } from "./support/dataTypes/postgres-data-type";

export class Resource1660061979230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table( {
            name: 'resource',
            columns: [
                TableColumnFactory.generatePkColumn( 'resource' ),
                TableColumnFactory.generateColumn('token', PostgresDataType.string),
                TableColumnFactory.generateFkColumn( 'user' ),
                TableColumnFactory.generateColumn( 'content', PostgresDataType.text, {
                    isNullable: false
                } ),
                TableColumnFactory.generateColumn( 'isActive', PostgresDataType.boolean, {
                    isNullable: false,
                    default: true
                } ),
                TableColumnFactory.generateUpdateDateColumn(),
                TableColumnFactory.generateCreatedDateColumn()
            ],
            foreignKeys: TableColumnFactory.getForeignKeys(),
        } )  );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
