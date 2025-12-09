import { gql } from '@apollo/client';

export const GET_FILTERS = gql`
  query GetFilters {
    getRegions
    getGenders
    getCategories
    getPaymentMethods
    getTags
  }
`;
