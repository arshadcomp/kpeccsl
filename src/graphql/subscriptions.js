/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      hsn
      images
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      name
      hsn
      images
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      name
      hsn
      images
      createdAt
      updatedAt
    }
  }
`;
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String) {
    onCreateOrder(owner: $owner) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String) {
    onUpdateOrder(owner: $owner) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String) {
    onDeleteOrder(owner: $owner) {
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
export const onCreateInventory = /* GraphQL */ `
  subscription OnCreateInventory {
    onCreateInventory {
      id
      stock
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInventory = /* GraphQL */ `
  subscription OnUpdateInventory {
    onUpdateInventory {
      id
      stock
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInventory = /* GraphQL */ `
  subscription OnDeleteInventory {
    onDeleteInventory {
      id
      stock
      createdAt
      updatedAt
    }
  }
`;
