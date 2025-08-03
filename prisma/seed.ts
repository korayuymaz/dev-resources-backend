import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Seeding database...");

	// Create some sample resources
	const resources = [
		{
			title: "React Documentation",
			description: "Official React documentation and tutorials",
			url: "https://react.dev",
			category: "DOCS" as const,
			isFavorite: false,
		},
		{
			title: "TypeScript Handbook",
			description: "Complete TypeScript documentation and guides",
			url: "https://www.typescriptlang.org/docs",
			category: "DOCS" as const,
			isFavorite: true,
		},
		{
			title: "VS Code",
			description: "Popular code editor with extensive extensions",
			url: "https://code.visualstudio.com",
			category: "TOOL" as const,
			isFavorite: true,
		},
		{
			title: "Tailwind CSS",
			description: "Utility-first CSS framework for rapid UI development",
			url: "https://tailwindcss.com",
			category: "UIKIT" as const,
			isFavorite: false,
		},
		{
			title: "GraphQL Tutorial",
			description: "Learn GraphQL from the ground up",
			url: "https://graphql.org/learn",
			category: "COURSE" as const,
			isFavorite: false,
		},
	];

	// Clear existing resources first
	await prisma.resource.deleteMany();

	// Create new resources
	await prisma.resource.createMany({
		data: resources,
	});

	console.log("✅ Database seeded successfully!");
}

main()
	.catch((e) => {
		console.error("❌ Error seeding database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
