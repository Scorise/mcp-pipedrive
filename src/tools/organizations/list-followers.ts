import type { PipedriveClient } from '../../pipedrive-client.js';
import { GetOrganizationFollowersSchema } from '../../schemas/organization.js';
import type { PipedriveResponse } from '../../types/common.js';

/**
 * Tool for listing followers of an organization
 */
export function getListOrganizationFollowersTool(client: PipedriveClient) {
  return {
    name: 'organizations_list_followers',
    description: `List all followers of a specific organization.

Returns the users that are following this organization and will receive
notifications about updates.

Each follower entry includes:
- User ID
- User name
- User email
- When they started following

This is useful for:
- Checking who is tracking an organization
- Auditing team access
- Managing notifications`,
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'Organization ID',
        },
      },
      required: ['id'],
    } as const,
    handler: async (params: unknown) => {
      const validated = GetOrganizationFollowersSchema.parse(params);

      const response = await client.get<PipedriveResponse<unknown[]>>(
        `/organizations/${validated.id}/followers`,
        undefined,
        { enabled: true, ttl: 60000 } // Cache for 1 minute
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
  };
}
