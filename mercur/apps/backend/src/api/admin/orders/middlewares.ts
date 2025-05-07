import { MiddlewareRoute, validateAndTransformQuery } from "@medusajs/framework";
import { AdminGetOrderParams } from "./validators";
import { adminOrderQueryConfig } from "./query-config";

export const ordersMiddlewares: MiddlewareRoute[] = [
    {
        method: ['GET'],
        matcher: '/admin/orders/:id/seller',
        middlewares: [
            validateAndTransformQuery(
                AdminGetOrderParams,
                adminOrderQueryConfig.retrieve
            ),
        ]
    },
]
