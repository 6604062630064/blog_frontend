/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	env: {
		API_ENDPOINT: "https://api.cloudvista.dev/",
	},
};

export default nextConfig;
