const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { buildSchema } = require("graphql");
const SECRET_KEY = require("../config.json").secret;

// Mock Database (Replace with a real DB like MongoDB/PostgreSQL later)
const users = [];
const companies = [
  { id: "1", name: "Refine CRM Inc." },
  { id: "2", name: "Tech Solutions Ltd." },
];

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
  }

  input LoginInput {
    email: String!
    password: String!
  }
`);

// ✅ **Resolvers (Backend Logic)**
const root = {
  register: async ({ registerInput }) => {
    const { email, password } = registerInput;

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) throw new Error("User already exists");

    // Hash password before storing
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      email,
      password: hashedPassword, // Store hashed password
    };

    users.push(newUser);

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return { accessToken: token, user: newUser };
  },

  login: async ({ loginInput }) => {
    const { email, password } = loginInput;

    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("User not found");

    // Compare hashed password
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      console.log(isValidPassword);
      throw new Error("Invalid credentials");
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return { accessToken: token, user };
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
