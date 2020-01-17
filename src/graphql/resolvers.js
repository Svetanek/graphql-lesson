import { gql } from 'apollo-boost';
import { addItemToCart } from './cart.utils';

//TogleCartHidden = definiatoon of type mutations should be capitzlized
export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }
  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;
//to specify that we call this query on a client;s side we let apollo know by using @client direcdirective
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;
//toggleCartHidden: (_root, _args, _context, _info) => {}
//updates cash with reverse value : cache.writeQuery({
// query: GET_CART_HIDDEN,
//   data: { cartHidden: !cartHidden },
// });

export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
        variables: {},
      });
      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });
      return !cartHidden;
    },
    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });
      const newCartItems = addItemToCart(cartItems, item);
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });
      return newCartItems;
    },
  },
};

// Mutation: {
//   toggleCartHidden: (_root, _args, { cache }) => {
//     const data = cache.readQuery({
//       query: GET_CART_HIDDEN,
//       variables: {},
//     });
//     const cartHidden = data.cartHidden;

//   },
// },
