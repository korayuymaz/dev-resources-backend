import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const resolvers = {
	Query: {
		resources: async (
			_: any,
			{ category, isFavorite }: { category?: string; isFavorite?: boolean }
		) => {
			return prisma.resource.findMany({
				where: {
					...(category ? { category: category as any } : {}),
					...(typeof isFavorite === "boolean" ? { isFavorite } : {}),
				},
			});
		},
	},
	Mutation: {
		createResource: async (_: any, { data }: any, context: any) => {
			if (!context.isAdmin) throw new Error("Unauthorized");
			return await prisma.resource.create({ data });
		},
		toggleFavorite: async (_: any, { id }: { id: string }, context: any) => {
			if (!context.isAdmin) throw new Error("Unauthorized");
			const resource = await prisma.resource.findUnique({
				where: { id: Number(id) },
			});

			if (!resource) throw new Error("Resource not found");

			return prisma.resource.update({
				where: { id: Number(id) },
				data: { isFavorite: !resource.isFavorite },
			});
		},
		deleteResource: async (_: any, { id }: { id: string }, context: any) => {
			if (!context.isAdmin) throw new Error("Unauthorized");
			const resource = await prisma.resource.findUnique({
				where: { id: Number(id) },
			});
			if (!resource) throw new Error("Resource not found");

			await prisma.resource.delete({ where: { id: Number(id) } });
			return { success: true, message: "Resource deleted successfully" };
		},
	},
};
