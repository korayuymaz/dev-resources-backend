# Dev Resources Backend

A GraphQL API backend for managing developer resources, built with Apollo Server, TypeScript, and Prisma.

## 🚀 Features

- **GraphQL API** - Modern GraphQL server with Apollo Server
- **Resource Management** - CRUD operations for developer resources
- **Category System** - Organize resources by categories (TOOL, COURSE, DOCS, VIDEO, UIKIT)
- **Favorites** - Mark and toggle favorite resources
- **Admin Authentication** - Admin-only operations with email-based authentication
- **MongoDB Database** - NoSQL database with Prisma ORM
- **TypeScript** - Full type safety and better developer experience

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB database (local or cloud)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd dev-resources-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # For MongoDB Atlas (cloud)
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dev_resources?retryWrites=true&w=majority"

   # For local MongoDB
   # DATABASE_URL="mongodb://localhost:27017/dev_resources"

   ADMIN_EMAIL="your-admin-email@example.com"
   ```

   **MongoDB Setup Options:**

   **Option A: MongoDB Atlas (Cloud)**

   - Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string from the cluster dashboard
   - Replace `username`, `password`, and `cluster` with your actual values

   **Option B: Local MongoDB**

   - Install MongoDB locally
   - Use the local connection string: `mongodb://localhost:27017/dev_resources`

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npm run generate

   # Push schema to database
   npm run db:push

   # Seed database with sample data
   npm run db:seed
   ```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

The server will start on `http://localhost:4000` with GraphQL Playground available at `http://localhost:4000/graphql`.

## 📚 API Documentation

### Schema Overview

The API provides the following main types:

#### Resource

```graphql
type Resource {
	id: ID!
	title: String!
	description: String!
	url: String!
	category: Category!
	isFavorite: Boolean!
}
```

#### Categories

- `TOOL` - Development tools and utilities
- `COURSE` - Learning courses and tutorials
- `DOCS` - Documentation and guides
- `VIDEO` - Video content and tutorials
- `UIKIT` - UI kits and design resources

### Queries

#### Get All Resources

```graphql
query {
	resources {
		id
		title
		description
		url
		category
		isFavorite
	}
}
```

#### Filter Resources by Category

```graphql
query {
	resources(category: TOOL) {
		id
		title
		description
		url
		category
		isFavorite
	}
}
```

#### Get Favorite Resources

```graphql
query {
	resources(isFavorite: true) {
		id
		title
		description
		url
		category
		isFavorite
	}
}
```

### Mutations

#### Create Resource (Admin Only)

```graphql
mutation {
	createResource(
		data: {
			title: "Example Tool"
			description: "A useful development tool"
			url: "https://example.com"
			category: TOOL
		}
	) {
		id
		title
		description
		url
		category
		isFavorite
	}
}
```

#### Toggle Favorite

```graphql
mutation {
	toggleFavorite(id: "1") {
		id
		title
		isFavorite
	}
}
```

#### Delete Resource (Admin Only)

```graphql
mutation {
	deleteResource(id: "1") {
		success
		message
	}
}
```

## 🔐 Authentication

The API uses a simple email-based admin authentication system:

- Set the `ADMIN_EMAIL` environment variable
- Include the admin email in the `x-user-email` header for admin operations
- Only users with matching admin email can perform create/delete operations

## 🗄️ Database Schema

The application uses MongoDB with the following main models:

- **User** - User accounts and authentication
- **Resource** - Developer resources with categories and favorites
- **Account** - OAuth account connections
- **Session** - User sessions
- **VerificationToken** - Email verification tokens

## 📁 Project Structure

```
dev-resources-backend/
├── src/
│   ├── index.ts          # Server entry point
│   ├── schema.ts         # GraphQL schema definitions
│   └── resolvers.ts      # GraphQL resolvers
├── prisma/
│   └── schema.prisma     # Database schema
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript project
- `npm run start` - Start production server
- `npm run generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data

## 🧪 Development

### Adding New Features

1. Update the GraphQL schema in `src/schema.ts`
2. Implement resolvers in `src/resolvers.ts`
3. Update database schema in `prisma/schema.prisma` if needed
4. Run migrations: `npm run migrate`
5. Test with GraphQL Playground

### Database Schema Changes

```bash
# Push schema changes to database
npm run db:push

# Seed database with sample data
npm run db:seed
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔧 Troubleshooting

### Common Issues

**Database Connection Error**

- Ensure your MongoDB connection string is correct
- For MongoDB Atlas, make sure your IP is whitelisted
- Check that your database user has the correct permissions

**Prisma Client Generation**

- Run `npm run generate` after schema changes
- Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

**Environment Variables**

- Make sure your `.env` file is in the root directory
- Verify the DATABASE_URL format: `mongodb+srv://...` for Atlas or `mongodb://...` for local

## 🆘 Support

For support and questions, please open an issue in the repository.
