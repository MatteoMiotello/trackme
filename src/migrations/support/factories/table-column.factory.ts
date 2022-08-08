import {TableColumnOptions, TableForeignKeyOptions} from "typeorm";
import {PostgresDataType} from "../dataTypes/postgres-data-type";

export class TableColumnFactory {
    public static fkHolder: TableForeignKeyOptions[] = [];


    static generatePkColumn(tableName: string): TableColumnOptions {
        return {
            generationStrategy: 'increment',
            isNullable: false,
            isUnique: true,
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            name: 'id',
            type: PostgresDataType.integer,
        };
    }

    static generateFkColumn(tableName: string, nullable: boolean = false, columnTitle: string | null = null, options: TableColumnOptions | null = null): TableColumnOptions {
        TableColumnFactory.fkHolder.push({
            columnNames: [columnTitle ?? tableName + 'Id'],
            referencedColumnNames: ['id'],
            referencedTableName: tableName,
            onDelete: "CASCADE"
        });

        return {
            isNullable: nullable,
            name: columnTitle ?? tableName + 'Id',
            unsigned: true,
            onUpdate: "cascade",
            type: PostgresDataType.integer,
            ...options,
        }
    }

    static generateColumn(columnName: string, type: string, options: Omit<TableColumnOptions, 'name' | 'type'> | null = null): TableColumnOptions {
        return {
            name: columnName,
            type: type,
            ...options
        }
    }

    static generateCreatedDateColumn(): TableColumnOptions {
        return {
            name: 'createdDate',
            type: PostgresDataType.timestamp,
            default: 'Current_timestamp',
            isNullable: false,
        }
    }

    static generateUpdateDateColumn(): TableColumnOptions {
        return {
            name: 'updatedDate',
            type: PostgresDataType.timestamp,
            isNullable: true,
            default: null
        }
    }

    static reset() {
        this.fkHolder = [];
    }

    static getForeignKeys(): TableForeignKeyOptions[] {
        return this.fkHolder;
    }
}
