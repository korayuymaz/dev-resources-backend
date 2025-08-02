import { gql } from "apollo-server";

export const typeDefs = gql`
	enum Category {
		TOOL
		COURSE
		DOCS
		VIDEO
		UIKIT
	}

	type Resource {
		id: ID!
		title: String!
		description: String!
		url: String!
		category: Category!
		isFavorite: Boolean!
	}

	type Query {
		resources(category: Category, isFavorite: Boolean): [Resource!]!
	}

	input NewResourceInput {
		title: String!
		description: String!
		url: String!
		category: Category!
	}

	type DeleteResourceResponse {
		success: Boolean!
		message: String
	}

	type Mutation {
		createResource(data: NewResourceInput!): Resource!
		toggleFavorite(id: ID!): Resource!
		deleteResource(id: ID!): DeleteResourceResponse!
	}
`;
