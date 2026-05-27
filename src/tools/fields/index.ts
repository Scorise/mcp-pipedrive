import type { PipedriveClient } from '../../pipedrive-client.js';
import { getListDealFieldsTool } from './deal-fields.js';
import { getListPersonFieldsTool } from './person-fields.js';
import { getListOrganizationFieldsTool } from './org-fields.js';
import { getListActivityFieldsTool } from './activity-fields.js';
import { getListProductFieldsTool } from './product-fields.js';
import { getGetFieldTool } from './get-field.js';
import { getListAllFieldsTool } from './all-fields.js';
import { getSearchFieldsTool } from './search-fields.js';
import { getCreateOrganizationFieldTool } from './create-org-field.js';
import { getUpdateOrganizationFieldTool } from './update-org-field.js';
import { getDeleteOrganizationFieldTool } from './delete-org-field.js';
import { getBulkDeleteOrganizationFieldsTool } from './bulk-delete-org-fields.js';

/**
 * Get all field-related tools for the MCP server
 *
 * This function aggregates all field tools into a single object:
 * - Entity-specific field lists: list_deal_fields, list_person_fields, list_organization_fields, list_activity_fields, list_product_fields
 * - Field retrieval: get_field
 * - Aggregated lists: list_all_fields
 * - Search: search_fields
 * - Organization field management (CRUD): create_organization_field, update_organization_field, delete_organization_field, bulk_delete_organization_fields
 *
 * These tools help LLMs discover and manage custom fields in Pipedrive. Read
 * definitions are cached (15 minutes); write operations invalidate the cache.
 *
 * @param client - The PipedriveClient instance to use for API calls
 * @returns Object containing all field tools with their configurations
 */
export function getFieldTools(client: PipedriveClient) {
  return {
    ...getListDealFieldsTool(client),
    ...getListPersonFieldsTool(client),
    ...getListOrganizationFieldsTool(client),
    ...getListActivityFieldsTool(client),
    ...getListProductFieldsTool(client),
    ...getGetFieldTool(client),
    ...getListAllFieldsTool(client),
    ...getSearchFieldsTool(client),
    ...getCreateOrganizationFieldTool(client),
    ...getUpdateOrganizationFieldTool(client),
    ...getDeleteOrganizationFieldTool(client),
    ...getBulkDeleteOrganizationFieldsTool(client),
  };
}
