import { ModuleProvider, Modules } from '@medusajs/framework/utils'

import VNPayService from './service'

export default ModuleProvider(Modules.PAYMENT, { services: [VNPayService] })
