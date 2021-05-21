/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      sellerID
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
export const listProducts = /* GraphQL */ `
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
        sellerID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      name
      hsn
      images
      createdAt
      updatedAt
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        hsn
        images
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
        sellerID
        createdAt
        updatedAt
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
export const ordersbyStatusByUser = /* GraphQL */ `
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ordersbyStatusByUserByTime = /* GraphQL */ `
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
      }
      nextToken
    }
  }
`;
export const ordersbyUserByTime = /* GraphQL */ `
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
