const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const config = require("../config.json");

// Dummy user database
const users = [
  {
    id: "1",
    email: "jane@mail.com",
    password: "$2a$10$GoRzoJB5gzk3V8WCnw5eVexInI5PJNjDdWKhk/RyHXljREjmOfjOu",
    name: "John Doe",
    avatarUrl: "https://example.com/avatar.jpg",
    phone: "+123456789",
    jobTitle: "CRM Manager",
  },
];

const SECRET_KEY = config.secret;

// Updated GraphQL Schema
const schema = buildSchema(`
    type Query {
      _: String
      user(id: ID!): User
    }
  
    type User {
      id: ID!
      email: String!
      name: String
      avatarUrl: String
      phone: String
      jobTitle: String
    }
  
    type AuthPayload {
      accessToken: String!
      user: User
    }
  
    input LoginInput {
      email: String!
    }
  
    type Mutation {
      login(loginInput: LoginInput!): AuthPayload
    }
  `);

// Resolver
const root = {
  user: ({ id }) => {
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    return user;
  },

  login: async ({ loginInput }) => {
    const { email } = loginInput;
    const user = users.find((u) => u.email === email);
    // if (!user) throw new Error("User not found");

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log({ accessToken: token, user })

    return { accessToken: token, user };
  },
};

function initGraphQL() {
  return graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // GraphiQL UI
  });
}

module.exports = initGraphQL;
