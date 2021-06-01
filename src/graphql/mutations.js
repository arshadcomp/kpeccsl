/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      name
      hsn
      images
      image
      parentId
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      name
      hsn
      images
      image
      parentId
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      name
      hsn
      images
      image
      parentId
      createdAt
      updatedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
      id
      status
      history {
        name
        createdAt
      }
      items {
        id
        code
        name
        image
        quantity
        price
        unit
        status
      }
      owner
      customer {
        address
        email
        name
        phone_number
        sub
      }
      sellerID
      createdAt
      updatedAt
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
      id
      status
      history {
        name
        createdAt
      }
      items {
        id
        code
        name
        image
        quantity
        price
        unit
        status
      }
      owner
      customer {
        address
        email
        name
        phone_number
        sub
      }
      sellerID
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
      id
      status
      history {
        name
        createdAt
      }
      items {
        id
        code
        name
        image
        quantity
        price
        unit
        status
      }
      owner
      customer {
        address
        email
        name
        phone_number
        sub
      }
      sellerID
      createdAt
      updatedAt
    }
  }
`;
export const createInventory = /* GraphQL */ `
  mutation CreateInventory(
    $input: CreateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    createInventory(input: $input, condition: $condition) {
      id
      stock
      createdAt
      updatedAt
    }
  }
`;
export const updateInventory = /* GraphQL */ `
  mutation UpdateInventory(
    $input: UpdateInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    updateInventory(input: $input, condition: $condition) {
      id
      stock
      createdAt
      updatedAt
    }
  }
`;
export const deleteInventory = /* GraphQL */ `
  mutation DeleteInventory(
    $input: DeleteInventoryInput!
    $condition: ModelInventoryConditionInput
  ) {
    deleteInventory(input: $input, condition: $condition) {
      id
      stock
      createdAt
      updatedAt
    }
  }
`;
