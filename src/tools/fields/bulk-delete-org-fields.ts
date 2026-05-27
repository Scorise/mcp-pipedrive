import type { PipedriveClient } from '../../pipedrive-client.js';
import { BulkDeleteOrganizationFieldsSchema } from '../../schemas/organization-field.js';
import type { PipedriveResponse } from '../../types/common.js';

export function getBulkDeleteOrganizationFieldsTool(client: PipedriveClient) {
  return {
    fields_bulk_delete_organization_fields: {
      description: `Delete multiple custom organization fields in a single request.

Accepts either:
- a comma-separated string of field IDs (e.g. \`"123,456,789"\`)
- an array of numeric IDs (e.g. \`[123, 456, 789]\`)

Both shapes are normalized to Pipedrive's expected \`?ids=\` query parameter.`,
      inputSchema: {
        type: 'object' as const,
        properties: {
          ids: {
            description: 'Comma-separated string of field IDs or array of numeric IDs to delete',
            oneOf: [
              { type: 'string', pattern: '^\\d+(,\\d+)*$' },
              { type: 'array', items: { type: 'number' }, minItems: 1 },
            ],
          },
        },
        required: ['ids'],
      },
      handler: async (args: unknown) => {
        const parsed = BulkDeleteOrganizationFieldsSchema.parse(args);
        const ids = Array.isArray(parsed.ids) ? parsed.ids.join(',') : parsed.ids;

        const response = await client.delete<PipedriveResponse<{ id: number[] }>>(
          '/organizationFields',
          { ids }
        );

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      },
    },
  };
}
