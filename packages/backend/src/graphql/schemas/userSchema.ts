
export const userSchema = `
  type User {
    id: ID!
    email: String!
    name: String!
    contact_email: String
    status: String
    company: String
    picture: String
  }

  extend type Query {
    user(id: ID!): User!
    userByEmail(email: String!): User!
    users: [User!]
    currentUser: User
    advancedUserSearch(searchTerm: String!): [User!]
    advancedUserFuzzySearch(searchTerm: String!): [User!]
  }

  extend type Mutation {
    createUser(email: String!, name: String!): User!
    updateUserProfile(id: ID!, name: String!, contact_email: String!, company: String!, status: String!): User!
    googleLogin(token: String!): User!
    googleLogout: User!
    # updateThumbnail(thumbnail: Upload!): File!
  }
`;
