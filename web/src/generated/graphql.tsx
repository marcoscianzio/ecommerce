import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Cart = {
  __typename?: 'Cart';
  active: Scalars['Boolean'];
  cartItems?: Maybe<Array<CartItem>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  itemCount: Scalars['Float'];
  order?: Maybe<Order>;
  readyForCheckout: Scalars['Boolean'];
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type CartItem = {
  __typename?: 'CartItem';
  cart: Cart;
  cartId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  item: Item;
  itemId: Scalars['String'];
  quantity: Scalars['Float'];
  total: Scalars['Float'];
  totalAmount: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type CreateItemInput = {
  description: Scalars['String'];
  images: Array<ItemImage>;
  name: Scalars['String'];
  stock: Scalars['Float'];
  unitAmount: Scalars['Float'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  item: Item;
  url: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  available: Scalars['Boolean'];
  cartItems: Array<CartItem>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  images: Array<Image>;
  name: Scalars['String'];
  stock: Scalars['Float'];
  stripeId: Scalars['String'];
  unitAmount: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type ItemImage = {
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToCart: Scalars['Boolean'];
  createCart: Cart;
  createCheckoutSession: Scalars['String'];
  createItem: Item;
  deleteItem: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  removeItemFromCart: Scalars['Boolean'];
};


export type MutationAddItemToCartArgs = {
  itemId: Scalars['String'];
};


export type MutationCreateItemArgs = {
  values: CreateItemInput;
};


export type MutationDeleteItemArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  values: UserInput;
};


export type MutationRegisterArgs = {
  values: UserInput;
};


export type MutationRemoveItemFromCartArgs = {
  itemId: Scalars['String'];
  whole?: InputMaybe<Scalars['Boolean']>;
};

export type Order = {
  __typename?: 'Order';
  cart: Cart;
  cartId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  stripeId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cartItems: Array<CartItem>;
  carts: Array<Cart>;
  checkoutSuccess: Order;
  item?: Maybe<Item>;
  items: Array<Item>;
  me?: Maybe<User>;
  myCart?: Maybe<Cart>;
  myOrders: Array<Order>;
  order?: Maybe<Order>;
  orders: Array<Order>;
};


export type QueryCheckoutSuccessArgs = {
  sessionId: Scalars['String'];
};


export type QueryItemArgs = {
  id: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  activeCart: Cart;
  carts?: Maybe<Array<Cart>>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['String'];
  orders?: Maybe<Array<Order>>;
  stripeId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AddItemToCartMutationVariables = Exact<{
  itemId: Scalars['String'];
}>;


export type AddItemToCartMutation = { __typename?: 'Mutation', addItemToCart: boolean };

export type CreateCartMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateCartMutation = { __typename?: 'Mutation', createCart: { __typename?: 'Cart', id: string, userId: string } };

export type CreateCheckoutSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateCheckoutSessionMutation = { __typename?: 'Mutation', createCheckoutSession: string };

export type CreateItemMutationVariables = Exact<{
  values: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: string, name: string, description?: string | null, stock: number, stripeId: string, unitAmount: number, createdAt: any, updatedAt: any, images: Array<{ __typename?: 'Image', url: string, id: string }> } };

export type DeleteItemMutationVariables = Exact<{
  deleteItemId: Scalars['String'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: boolean };

export type LoginMutationVariables = Exact<{
  values: UserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, user?: { __typename?: 'User', id: string, email: string, stripeId?: string | null, createdAt: any, updatedAt: any, activeCart: { __typename?: 'Cart', itemCount: number } } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  values: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', message: string, field: string }> | null, user?: { __typename?: 'User', id: string, email: string, stripeId?: string | null, createdAt: any, updatedAt: any, activeCart: { __typename?: 'Cart', itemCount: number } } | null } };

export type RemoveItemFromCartMutationVariables = Exact<{
  itemId: Scalars['String'];
  whole?: InputMaybe<Scalars['Boolean']>;
}>;


export type RemoveItemFromCartMutation = { __typename?: 'Mutation', removeItemFromCart: boolean };

export type CartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartItemsQuery = { __typename?: 'Query', cartItems: Array<{ __typename?: 'CartItem', cartId: string, itemId: string, quantity: number, total: number, totalAmount: number, item: { __typename?: 'Item', name: string, description?: string | null, unitAmount: number } }> };

export type CartsQueryVariables = Exact<{ [key: string]: never; }>;


export type CartsQuery = { __typename?: 'Query', carts: Array<{ __typename?: 'Cart', id: string, userId: string, active: boolean }> };

export type CheckoutSuccessQueryVariables = Exact<{
  sessionId: Scalars['String'];
}>;


export type CheckoutSuccessQuery = { __typename?: 'Query', checkoutSuccess: { __typename?: 'Order', id: string, stripeId: string, createdAt: any, updatedAt: any } };

export type ItemQueryVariables = Exact<{
  itemId: Scalars['String'];
}>;


export type ItemQuery = { __typename?: 'Query', item?: { __typename?: 'Item', id: string, name: string, description?: string | null, unitAmount: number, available: boolean, stock: number, createdAt: any, updatedAt: any, images: Array<{ __typename?: 'Image', id: string, url: string }> } | null };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, name: string, description?: string | null, unitAmount: number, stock: number, createdAt: any, updatedAt: any, images: Array<{ __typename?: 'Image', id: string, url: string }> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, stripeId?: string | null, activeCart: { __typename?: 'Cart', itemCount: number } } | null };

export type MyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCartQuery = { __typename?: 'Query', myCart?: { __typename?: 'Cart', id: string, readyForCheckout: boolean, active: boolean, itemCount: number, total: number, userId: string, cartItems?: Array<{ __typename?: 'CartItem', cartId: string, itemId: string, quantity: number, total: number, item: { __typename?: 'Item', id: string, name: string, description?: string | null, stock: number, available: boolean, unitAmount: number, images: Array<{ __typename?: 'Image', id: string, url: string }> } }> | null } | null };

export type MyOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type MyOrdersQuery = { __typename?: 'Query', myOrders: Array<{ __typename?: 'Order', id: string, stripeId: string, userId: string, cartId: string, createdAt: any, cart: { __typename?: 'Cart', id: string, userId: string, itemCount: number, total: number, cartItems?: Array<{ __typename?: 'CartItem', cartId: string, itemId: string, total: number, quantity: number, item: { __typename?: 'Item', id: string, name: string, stripeId: string, description?: string | null, unitAmount: number, images: Array<{ __typename?: 'Image', url: string }> } }> | null } }> };


export const AddItemToCartDocument = gql`
    mutation AddItemToCart($itemId: String!) {
  addItemToCart(itemId: $itemId)
}
    `;
export type AddItemToCartMutationFn = Apollo.MutationFunction<AddItemToCartMutation, AddItemToCartMutationVariables>;

/**
 * __useAddItemToCartMutation__
 *
 * To run a mutation, you first call `useAddItemToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToCartMutation, { data, loading, error }] = useAddItemToCartMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useAddItemToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddItemToCartMutation, AddItemToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemToCartMutation, AddItemToCartMutationVariables>(AddItemToCartDocument, options);
      }
export type AddItemToCartMutationHookResult = ReturnType<typeof useAddItemToCartMutation>;
export type AddItemToCartMutationResult = Apollo.MutationResult<AddItemToCartMutation>;
export type AddItemToCartMutationOptions = Apollo.BaseMutationOptions<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const CreateCartDocument = gql`
    mutation createCart {
  createCart {
    id
    userId
  }
}
    `;
export type CreateCartMutationFn = Apollo.MutationFunction<CreateCartMutation, CreateCartMutationVariables>;

/**
 * __useCreateCartMutation__
 *
 * To run a mutation, you first call `useCreateCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCartMutation, { data, loading, error }] = useCreateCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCartMutation(baseOptions?: Apollo.MutationHookOptions<CreateCartMutation, CreateCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCartMutation, CreateCartMutationVariables>(CreateCartDocument, options);
      }
export type CreateCartMutationHookResult = ReturnType<typeof useCreateCartMutation>;
export type CreateCartMutationResult = Apollo.MutationResult<CreateCartMutation>;
export type CreateCartMutationOptions = Apollo.BaseMutationOptions<CreateCartMutation, CreateCartMutationVariables>;
export const CreateCheckoutSessionDocument = gql`
    mutation createCheckoutSession {
  createCheckoutSession
}
    `;
export type CreateCheckoutSessionMutationFn = Apollo.MutationFunction<CreateCheckoutSessionMutation, CreateCheckoutSessionMutationVariables>;

/**
 * __useCreateCheckoutSessionMutation__
 *
 * To run a mutation, you first call `useCreateCheckoutSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCheckoutSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCheckoutSessionMutation, { data, loading, error }] = useCreateCheckoutSessionMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCheckoutSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCheckoutSessionMutation, CreateCheckoutSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCheckoutSessionMutation, CreateCheckoutSessionMutationVariables>(CreateCheckoutSessionDocument, options);
      }
export type CreateCheckoutSessionMutationHookResult = ReturnType<typeof useCreateCheckoutSessionMutation>;
export type CreateCheckoutSessionMutationResult = Apollo.MutationResult<CreateCheckoutSessionMutation>;
export type CreateCheckoutSessionMutationOptions = Apollo.BaseMutationOptions<CreateCheckoutSessionMutation, CreateCheckoutSessionMutationVariables>;
export const CreateItemDocument = gql`
    mutation createItem($values: CreateItemInput!) {
  createItem(values: $values) {
    id
    name
    description
    images {
      url
      id
    }
    stock
    stripeId
    unitAmount
    createdAt
    updatedAt
  }
}
    `;
export type CreateItemMutationFn = Apollo.MutationFunction<CreateItemMutation, CreateItemMutationVariables>;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createItemMutation, { data, loading, error }] = useCreateItemMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useCreateItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateItemMutation, CreateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
      }
export type CreateItemMutationHookResult = ReturnType<typeof useCreateItemMutation>;
export type CreateItemMutationResult = Apollo.MutationResult<CreateItemMutation>;
export type CreateItemMutationOptions = Apollo.BaseMutationOptions<CreateItemMutation, CreateItemMutationVariables>;
export const DeleteItemDocument = gql`
    mutation deleteItem($deleteItemId: String!) {
  deleteItem(id: $deleteItemId)
}
    `;
export type DeleteItemMutationFn = Apollo.MutationFunction<DeleteItemMutation, DeleteItemMutationVariables>;

/**
 * __useDeleteItemMutation__
 *
 * To run a mutation, you first call `useDeleteItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteItemMutation, { data, loading, error }] = useDeleteItemMutation({
 *   variables: {
 *      deleteItemId: // value for 'deleteItemId'
 *   },
 * });
 */
export function useDeleteItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteItemMutation, DeleteItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument, options);
      }
export type DeleteItemMutationHookResult = ReturnType<typeof useDeleteItemMutation>;
export type DeleteItemMutationResult = Apollo.MutationResult<DeleteItemMutation>;
export type DeleteItemMutationOptions = Apollo.BaseMutationOptions<DeleteItemMutation, DeleteItemMutationVariables>;
export const LoginDocument = gql`
    mutation Login($values: UserInput!) {
  login(values: $values) {
    errors {
      message
      field
    }
    user {
      id
      email
      stripeId
      createdAt
      updatedAt
      activeCart {
        itemCount
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($values: UserInput!) {
  register(values: $values) {
    errors {
      message
      field
    }
    user {
      id
      email
      stripeId
      createdAt
      updatedAt
      activeCart {
        itemCount
      }
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      values: // value for 'values'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveItemFromCartDocument = gql`
    mutation removeItemFromCart($itemId: String!, $whole: Boolean) {
  removeItemFromCart(itemId: $itemId, whole: $whole)
}
    `;
export type RemoveItemFromCartMutationFn = Apollo.MutationFunction<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;

/**
 * __useRemoveItemFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveItemFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveItemFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeItemFromCartMutation, { data, loading, error }] = useRemoveItemFromCartMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      whole: // value for 'whole'
 *   },
 * });
 */
export function useRemoveItemFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>(RemoveItemFromCartDocument, options);
      }
export type RemoveItemFromCartMutationHookResult = ReturnType<typeof useRemoveItemFromCartMutation>;
export type RemoveItemFromCartMutationResult = Apollo.MutationResult<RemoveItemFromCartMutation>;
export type RemoveItemFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;
export const CartItemsDocument = gql`
    query cartItems {
  cartItems {
    cartId
    itemId
    item {
      name
      description
      unitAmount
    }
    quantity
    total
    totalAmount
  }
}
    `;

/**
 * __useCartItemsQuery__
 *
 * To run a query within a React component, call `useCartItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartItemsQuery(baseOptions?: Apollo.QueryHookOptions<CartItemsQuery, CartItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartItemsQuery, CartItemsQueryVariables>(CartItemsDocument, options);
      }
export function useCartItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartItemsQuery, CartItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartItemsQuery, CartItemsQueryVariables>(CartItemsDocument, options);
        }
export type CartItemsQueryHookResult = ReturnType<typeof useCartItemsQuery>;
export type CartItemsLazyQueryHookResult = ReturnType<typeof useCartItemsLazyQuery>;
export type CartItemsQueryResult = Apollo.QueryResult<CartItemsQuery, CartItemsQueryVariables>;
export const CartsDocument = gql`
    query carts {
  carts {
    id
    userId
    active
  }
}
    `;

/**
 * __useCartsQuery__
 *
 * To run a query within a React component, call `useCartsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartsQuery(baseOptions?: Apollo.QueryHookOptions<CartsQuery, CartsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartsQuery, CartsQueryVariables>(CartsDocument, options);
      }
export function useCartsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartsQuery, CartsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartsQuery, CartsQueryVariables>(CartsDocument, options);
        }
export type CartsQueryHookResult = ReturnType<typeof useCartsQuery>;
export type CartsLazyQueryHookResult = ReturnType<typeof useCartsLazyQuery>;
export type CartsQueryResult = Apollo.QueryResult<CartsQuery, CartsQueryVariables>;
export const CheckoutSuccessDocument = gql`
    query CheckoutSuccess($sessionId: String!) {
  checkoutSuccess(sessionId: $sessionId) {
    id
    stripeId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCheckoutSuccessQuery__
 *
 * To run a query within a React component, call `useCheckoutSuccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckoutSuccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckoutSuccessQuery({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useCheckoutSuccessQuery(baseOptions: Apollo.QueryHookOptions<CheckoutSuccessQuery, CheckoutSuccessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckoutSuccessQuery, CheckoutSuccessQueryVariables>(CheckoutSuccessDocument, options);
      }
export function useCheckoutSuccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckoutSuccessQuery, CheckoutSuccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckoutSuccessQuery, CheckoutSuccessQueryVariables>(CheckoutSuccessDocument, options);
        }
export type CheckoutSuccessQueryHookResult = ReturnType<typeof useCheckoutSuccessQuery>;
export type CheckoutSuccessLazyQueryHookResult = ReturnType<typeof useCheckoutSuccessLazyQuery>;
export type CheckoutSuccessQueryResult = Apollo.QueryResult<CheckoutSuccessQuery, CheckoutSuccessQueryVariables>;
export const ItemDocument = gql`
    query Item($itemId: String!) {
  item(id: $itemId) {
    id
    name
    description
    unitAmount
    images {
      id
      url
    }
    available
    stock
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useItemQuery(baseOptions: Apollo.QueryHookOptions<ItemQuery, ItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, options);
      }
export function useItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemQuery, ItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemQuery, ItemQueryVariables>(ItemDocument, options);
        }
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = Apollo.QueryResult<ItemQuery, ItemQueryVariables>;
export const ItemsDocument = gql`
    query items {
  items {
    id
    name
    description
    unitAmount
    images {
      id
      url
    }
    stock
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    stripeId
    activeCart {
      itemCount
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyCartDocument = gql`
    query MyCart {
  myCart {
    id
    cartItems {
      cartId
      itemId
      item {
        id
        name
        description
        stock
        available
        unitAmount
        images {
          id
          url
        }
      }
      quantity
      total
    }
    readyForCheckout
    active
    itemCount
    total
    userId
  }
}
    `;

/**
 * __useMyCartQuery__
 *
 * To run a query within a React component, call `useMyCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCartQuery(baseOptions?: Apollo.QueryHookOptions<MyCartQuery, MyCartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCartQuery, MyCartQueryVariables>(MyCartDocument, options);
      }
export function useMyCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCartQuery, MyCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCartQuery, MyCartQueryVariables>(MyCartDocument, options);
        }
export type MyCartQueryHookResult = ReturnType<typeof useMyCartQuery>;
export type MyCartLazyQueryHookResult = ReturnType<typeof useMyCartLazyQuery>;
export type MyCartQueryResult = Apollo.QueryResult<MyCartQuery, MyCartQueryVariables>;
export const MyOrdersDocument = gql`
    query myOrders {
  myOrders {
    id
    stripeId
    userId
    cartId
    cart {
      id
      userId
      cartItems {
        cartId
        itemId
        item {
          id
          name
          stripeId
          description
          unitAmount
          images {
            url
          }
        }
        total
        quantity
      }
      itemCount
      total
    }
    createdAt
  }
}
    `;

/**
 * __useMyOrdersQuery__
 *
 * To run a query within a React component, call `useMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrdersQuery(baseOptions?: Apollo.QueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyOrdersQuery, MyOrdersQueryVariables>(MyOrdersDocument, options);
      }
export function useMyOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyOrdersQuery, MyOrdersQueryVariables>(MyOrdersDocument, options);
        }
export type MyOrdersQueryHookResult = ReturnType<typeof useMyOrdersQuery>;
export type MyOrdersLazyQueryHookResult = ReturnType<typeof useMyOrdersLazyQuery>;
export type MyOrdersQueryResult = Apollo.QueryResult<MyOrdersQuery, MyOrdersQueryVariables>;