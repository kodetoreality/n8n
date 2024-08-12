import type { MigrationContext, ReversibleMigration } from '@db/types';

const annotationsTableName = 'execution_annotations';
const annotationTagsTableName = 'annotation_tag_entity';
const annotationTagMappingsTableName = 'execution_annotation_tags';

export class CreateAnnotationTables1723039529455 implements ReversibleMigration {
	async up({ schemaBuilder: { createTable, column }, tablePrefix }: MigrationContext) {
		await createTable(annotationsTableName)
			.withColumns(
				column('id').int.notNull.primary.autoGenerate,
				column('executionId').int.notNull,
				column('vote').varchar(6),
				column('note').text,
			)
			.withIndexOn('executionId', true)
			.withForeignKey('executionId', {
				tableName: 'execution_entity',
				columnName: 'id',
				onDelete: 'CASCADE',
			}).withTimestamps;

		await createTable(annotationTagsTableName).withColumns(
			column('id').varchar(24).primary.notNull,
			column('name').varchar(24).notNull,
		).withTimestamps;

		await createTable(annotationTagMappingsTableName)
			.withColumns(column('annotationId').int.notNull, column('tagId').varchar(24).notNull)
			.withForeignKey('annotationId', {
				tableName: annotationsTableName,
				columnName: 'id',
				onDelete: 'CASCADE',
			})
			.withIndexOn('tagId')
			.withIndexOn('annotationId')
			.withForeignKey('tagId', {
				tableName: annotationTagsTableName,
				columnName: 'id',
				onDelete: 'CASCADE',
			});
	}

	async down({ schemaBuilder: { dropTable } }: MigrationContext) {
		console.log('DOWN DOWN DOWN');
		await dropTable(annotationTagMappingsTableName);
		await dropTable(annotationTagsTableName);
		await dropTable(annotationsTableName);
	}
}
