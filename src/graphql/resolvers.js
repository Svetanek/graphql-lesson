import { gql } from 'apollo-boost';

//TogleCartHidden = definiatoon of type mutations should be capitzlized
export const typeDefs = gql`
  extend type Mutation {
    ToggleCartHidden: Boolean!
  }
`;
//to specify that we call this query on a client;s side we let apollo know by using @client direcdirective
const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
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
