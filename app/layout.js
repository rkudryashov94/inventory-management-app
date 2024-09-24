import "./globals.css";

export const metadata = {
	title: "Pantry Tracker App",
	description:
		"Easily track your all your items and their quantity in your pantry.",
	keywords: [
		"inventory tracker",
		"grocery tracker",
		"pantry tracker",
		"food management",
		"meal planning",
		"pantry inventory",
		"kitchen inventory",
		"ingredient tracker",
		"pantry organization",
	],
	author: "Roman Kudryashov",
	verification: {
		google: "6IFdr087Tj-ReSBlc3qYvQzTBVlC7Pnc3_-7Ss-_vTw",
	},
};

// Viewport configuration for mobile optimization
export const viewport = {
	width: "device-width",
	initialScale: 1.0,
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>Pantry Tracker App</title>
				{/* Standard Meta Tags */}
				<meta
					name="description"
					content="Easily track your all your items and their quantity in your pantry."
				/>
				<meta
					name="keywords"
					content={[
						"inventory tracker",
						"grocery tracker",
						"pantry tracker",
						"food management",
						"meal planning",
						"pantry inventory",
						"kitchen inventory",
						"ingredient tracker",
						"pantry organization",
					]}
				/>
				<meta name="author" content="Roman Kudryashov" />
				<meta
					name="google-site-verification"
					content="6IFdr087Tj-ReSBlc3qYvQzTBVlC7Pnc3_-7Ss-_vTw"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body>{children}</body>
		</html>
	);
}
