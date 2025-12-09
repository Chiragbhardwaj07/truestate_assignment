const typeDefs = `#graphql
  scalar DateTime
  scalar Decimal

  type SalesTransaction {
    transaction_id: ID!
    tx_date: DateTime
    customer_id: String
    customer_name: String
    phone_number: String
    gender: String
    age: Int
    customer_region: String
    customer_type: String
    product_id: String
    product_name: String
    brand: String
    product_category: String
    tags: String
    quantity: Int
    price_per_unit: Decimal
    discount_percentage: Decimal
    total_amount: Decimal
    final_amount: Decimal
    payment_method: String
    order_status: String
    delivery_type: String
    store_id: String
    store_location: String
    salesperson_id: String
    employee_name: String
  }

  input FilterInput {
    customer_region: [String]
    gender: [String]
    age_min: Int
    age_max: Int
    product_category: [String]
    tags: [String]
    payment_method: [String]
    date_start: DateTime
    date_end: DateTime
  }

  enum SortField {
    DATE
    QUANTITY
    CUSTOMER_NAME
  }

  enum SortOrder {
    ASC
    DESC
  }

  input SortInput {
    field: SortField!
    order: SortOrder!
  }

  type SalesResponse {
    data: [SalesTransaction]
    total: Int
    page: Int
    totalPages: Int
    totalAmount: Decimal
    totalUnits: Int
    totalDiscount: Decimal
  }

  type Query {
    getSales(
      search: String
      filters: FilterInput
      sort: SortInput
      page: Int
      limit: Int
    ): SalesResponse
    
    # Helper queries for UI filters
    getRegions: [String]
    getGenders: [String]
    getCategories: [String]
    getPaymentMethods: [String]
    getTags: [String]
  }
`;

module.exports = typeDefs;
