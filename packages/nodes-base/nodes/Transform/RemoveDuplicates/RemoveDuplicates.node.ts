import type { INodeTypeBaseDescription, IVersionedNodeType } from 'n8n-workflow';
import { VersionedNodeType } from 'n8n-workflow';

import { RemoveDuplicatesV1 } from './v1/RemoveDuplicatesV1.node';
// import { HighLevelV2 } from './v2/HighLevelV2.node';
export class RemoveDuplicates extends VersionedNodeType {
	constructor() {
		const baseDescription: INodeTypeBaseDescription = {
			displayName: 'Remove Duplicates',
			name: 'removeDuplicates',
			icon: 'file:removeDuplicates.svg',
			group: ['transform'],
			defaultVersion: 1,
			description: 'Delete items with matching field values',
		};

		const nodeVersions: IVersionedNodeType['nodeVersions'] = {
			1: new RemoveDuplicatesV1(baseDescription),
			1.1: new RemoveDuplicatesV1(baseDescription),
			// 2: new HighLevelV2(baseDescription),
		};

		super(nodeVersions, baseDescription);
	}
}
