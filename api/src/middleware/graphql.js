const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { buildSchema } = require("graphql");
const SECRET_KEY = require("../config.json").secret;
const accounts = require("../services/accounts.service");

// Mock Database (Replace with a real DB like MongoDB/PostgreSQL later)

const schema = buildSchema(`
  type Query {
    _: String  # Placeholder for empty root queries
    user(id: ID!): User
    users: [User]
    companies: [Company]
  }

  type Mutation {
    register(registerInput: RegisterInput!): AuthPayload
    login(loginInput: LoginInput!): AuthPayload
  }

  type User {
    id: ID!
    email: String!
  }

  type Company {
    id: ID!
    name: String!
  }

  type AuthPayload {
    accessToken: String!
    user: User
  }

  input RegisterInput {
    email: String!
    password: String!
    subscription: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`);

// ✅ **Resolvers (Backend Logic)**
const root = {
  register: async ({ registerInput }) => {
    const { email, password, subscription } = registerInput;

    try {
      const response = await accounts.register({
        email,
        password,
        subscription,
      });
      return response;
    } catch (error) {
      e = new Error(error);
      return {
        e,
        message: "Registration failed",
      };
    }
  },

  login: async ({ loginInput }) => {
    const { email, password } = loginInput;

    try {
      const response = await accounts.authenticate(email, password);
      console.log(response.account);
      return {
        accessToken: response.user.jwtToken,
        user: response.account,
      };
    } catch (error) {
      console.log(error);
      e = new Error(error);
      return {
        e,
        message: "Login failed",
      };
    }
  },

  // Fetch a single user by ID
  user: ({ id }) => {
    return users.find((u) => u.id === id);
  },

  // Fetch all users
  users: () => {
    return users.map(({ password, ...user }) => user); // Exclude password
  },

  // Fetch companies
  companies: () => companies,
};

module.exports = {
  schema,
  root,
};
