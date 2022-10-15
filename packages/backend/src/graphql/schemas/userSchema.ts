
export const userSchema = `
  type User {
    id: ID!
    email: String!
    name: String!
    contact_email: String
    status: String
    company: String
  }

  extend type Query {
    user(id: ID!): User!
    users: [User!]
    advancedUserSearch(searchTerm: String!): [User!]
  }

  extend type Mutation {
    createUser(email: String!, name: String!): User!
    # updateThumbnail(thumbnail: Upload!): File!
  }
`;
