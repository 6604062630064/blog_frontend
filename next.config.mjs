/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	env: {
		API_ENDPOINT: "http://localhost:5010/",
	},
};

export default nextConfig;
