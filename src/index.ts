import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const userEmail = req.headers["x-user-email"];
		const isAdmin = userEmail === process.env.ADMIN_EMAIL;
		return { isAdmin };
	},
});

server.listen({ port: 4000 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
