/** Roles in the system.*/
export enum Roles {
  /*** All registered `users` have this `role`.
   * They can:
   ** * Order of products.
   ** * See all list of products and store.
   */
  USER = 'User',
  /*** Have all the rights that `user`.
   ** They can:
   ** * Change the quantity of product.
   */
  SELLER = 'seller',
  /*** Have all the rights that `seller`.
   ** They can:
   ** * Additional of order the products to the store.
   */
  MANAGER = 'manager',
  /*** Have all the rights that `manager`.
   ** The owner a store, `only` in their the stores, can:
   ** * Giving and removing the roles of `managers` and `sellers`.
   ** * Check exchequer.
   ** * Add or remove a products.
   ** * Add or remove a ad and sells-out.
   ** * Block or unblock the users.
   ** * View a rating purchase of the products.
   */
  MERCHANT = 'merchant',
  /*** Have all rights `except` delete and check exchequer in the system.
   ** They can:
   ** * Create or blocking of store.
   ** * Give or block the role of `merchant`.
   ** * Add or block the services.
   ** * Add or remove a ad all the stores.
   ** * Block or unblock the users.
   */
  MODERATO = 'moderato',
  /*** Have all the rights in the system.
   ** He can also:
   ** * Remove the store.
   ** * Check all balances the stores and an exchequer.
   ** * View all the rating purchase of the products.
   */
  ADMIN = 'Admin',
}
