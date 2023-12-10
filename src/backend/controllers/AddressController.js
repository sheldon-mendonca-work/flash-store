import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to Address are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles getting items to user's address.
 * send GET Request at /api/user/address
 * */

export const getAddressItemsHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  if (!userId) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const userAddress = schema.users.findBy({ _id: userId }).addressList;
  return new Response(200, {}, { addressList : userAddress });
};

/**
 * This handler handles adding items to user's Address.
 * send POST Request at /api/user/address
 * body contains {address}
 * */

export const addItemToAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const {addressList: userAddress, addressCount } = schema.users.findBy({ _id: userId });
    
    const { address } = JSON.parse(request.requestBody);
    userAddress.push({
      address: address,
      addressIndex: addressCount+1,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    });
    this.db.users.update({ _id: userId }, { addressCount: addressCount+1, addressList: userAddress });
    return new Response(201, {}, { addressList: userAddress });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles removing items to user's address.
 * send DELETE Request at /api/user/address
 * body contains {product}
 * */

export const removeItemFromAddressHandler = function (schema, request) {
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    
    let { addressList: userAddress } = schema.users.findBy({ _id: userId }).attrs;
    
    const productId = Number(request.params.productId);
    userAddress = userAddress.filter((item) => item.addressIndex !== productId);
    this.db.users.update({ _id : userId }, { addressList: userAddress });
    return new Response(200, {}, { addressList: userAddress });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles adding items to user's address.
 * send POST Request at /api/user/address/:productId
 * body contains {address}
 * */

export const updateAddressItemHandler = function (schema, request) {
  const productId = Number(request.params.productId);
  const userId = requiresAuth.call(this, request);
  try {
    if (!userId) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    let userAddress = schema.users.findBy({ _id: userId }).addressList;
    const { address } = JSON.parse(request.requestBody);
    userAddress = userAddress.filter((item) => item.addressIndex !== productId);
    userAddress.push({...address, addressIndex: productId , updatedAt : formatDate()});
    
    this.db.users.update({ _id: userId }, { addressList: userAddress });
    return new Response(200, {}, { addressList: userAddress });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
