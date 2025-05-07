/**
 * @schema AdminOrderSellerRes
 * title: "Order Seller Response"
 * description: "Response object containing the seller associated with an order"
 * type: object
 * properties:
 *   seller:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       photo:
 *         type: string
 *         description: "URL to the seller's photo"
 *         example: "https://example.com/photo.jpg"
 *       email:
 *         type: string
 *         description: "Email address of the seller"
 *       phone:
*          type: string
*          description: "Phone number of the seller"
*          example: "+1-234-567-890"
 */

/**
 * @schema AdminGetOrderSellerParams
 * title: "Get Order Seller Params"
 * type: object
 * required:
 *   - order_id
 * properties:
 *   order_id:
 *     type: string
 *     description: The ID of the order
 */