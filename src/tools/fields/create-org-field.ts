import type { PipedriveClient } from '../../pipedrive-client.js';
import { CreateOrganizationFieldSchema } from '../../schemas/organization-field.js';
import type { PipedriveResponse } from '../../types/common.js';

export function getCreateOrganizationFieldTool(client: PipedriveClient) {
  return {
    fields_create_organization_field: {
      description: `Create a new custom field for organizations.

For \`enum\` and \`set\` field types, you must provide \`options\` (a non-empty array of \`{ label }\` objects).

Common use cases:
- Add a "Customer Type" dropdown to organizations
- Add a custom monetary value (e.g., "Annual Revenue")
- Add a date field (e.g., "Customer Since")

After creation, the field's \`key\` is the hash you must use in Organization create/update payloads. Field definitions are cached for 15 minutes — call \`fields_list_organization_fields\` after a brief delay to see it reflected.`,
      inputSchema: {
        type: 'object' as const,
        properties: {
          name: {
            type: 'string',
            description: 'Display name of the field',
          },
          field_type: {
            type: 'string',
            enum: [
              'varchar',
              'varchar_auto',
              'text',
              'double',
              'monetary',
              'date',
              'set',
              'enum',
              'user',
              'org',
              'people',
              'phone',
              'time',
              'timerange',
              'daterange',
              'address',
            ],
            description: 'Type of the field. `enum`/`set` require `options`.',
          },
          options: {
            type: 'array',
            description: 'Required for `enum` and `set` field types',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', description: 'Existing option ID (when updating)' },
                label: { type: 'string', description: 'Visible label of the option' },
              },
              required: ['label'],
            },
          },
          add_visible_flag: {
            type: 'boolean',
            description: 'Whether the field is shown in the "add" form by default',
          },
        },
        required: ['name', 'field_type'],
      },
      handler: async (args: unknown) => {
        const parsed = CreateOrganizationFieldSchema.parse(args);

        const response = await client.post<PipedriveResponse<unknown>>(
          '/organizationFields',
          parsed
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
