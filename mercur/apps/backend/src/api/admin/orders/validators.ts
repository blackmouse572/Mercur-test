import { z } from 'zod'
import { createFindParams } from '@medusajs/medusa/api/utils/validators'

export type AdminGetOrderParamsType = z.infer<typeof AdminGetOrderParams>
export const AdminGetOrderParams = createFindParams({
    offset: 0,
    limit: 50
})