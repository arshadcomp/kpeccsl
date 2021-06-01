export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      keyword
      name
      description
      hsn
      code
      tax
      mrp
      purchase_rate
      rate
      gst
      price
      image
      unit
      leastCount
      featured
      seller {
        name
        gstin
      }
      quantity
      createdAt
      updatedAt
      inventory {
        id
        stock
        createdAt
        updatedAt
      }
    }
  }
`;
export const listProductsWithInventory = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        keyword
        name
        description
        hsn
        code
        tax
        mrp
        purchase_rate
        rate
        gst
        price
        image
        unit
        leastCount
        featured
        quantity
        createdAt
        updatedAt
        inventory {
          id
          stock
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const listProductsWithName = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        keyword
        hsn
      }
      nextToken
    }
  }
`;

export const searchProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`;

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      status
      history {
        name
        createdAt
      }
      items {
        id
        name
        image
        quantity
        price
        unit
        status
      }
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        status
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const productByCode = /* GraphQL */ `
  query ProductByCode(
    $code: String
    $sortDirection: ModelSortDirection
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productByCode(
      code: $code
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        keyword
        name
        description
        hsn
        code
        tax
        mrp
        purchase_rate
        rate
        gst
        price
        image
        unit
        leastCount
        featured
        quantity
        createdAt
        updatedAt
        inventory {
          id
          stock
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;

export const ordersByStatusByUser = /* GraphQL */ `
  query OrdersbyStatusByUser(
    $status: Status
    $owner: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    OrdersbyStatusByUser(
      status: $status
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        owner
        sellerID
        createdAt
        updatedAt
        history {
          name
          createdAt
        }
        items {
          id
          name
          image
          quantity
          price
          unit
          status
        }
      }
      nextToken
    }
  }
`;
export const ordersByStatusByUserByTime = /* GraphQL */ `
  query OrdersbyStatusByUserByTime(
    $status: Status
    $ownerCreatedAt: ModelOrderByStatusByUserByTimeCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    OrdersbyStatusByUserByTime(
      status: $status
      ownerCreatedAt: $ownerCreatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        owner
        createdAt
        updatedAt
        items {
          id
          name
          image
          quantity
          price
          unit
          status
        }
      }
      nextToken
    }
  }
`;
export const ordersByUserByTime = /* GraphQL */ `
  query OrdersbyUserByTime(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    OrdersbyUserByTime(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        status
        owner
        createdAt
        updatedAt
        items {
          id
          name
          image
          quantity
          price
          unit
          status
        }
      }
      nextToken
    }
  }
`;
export const listInventorys = /* GraphQL */ `
  query ListInventorys(
    $filter: ModelInventoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInventorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        stock
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInventory = /* GraphQL */ `
  query GetInventory($id: ID!) {
    getInventory(id: $id) {
      id
      stock
      createdAt
      updatedAt
    }
  }
`;
