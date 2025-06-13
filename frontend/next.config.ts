import type { NextConfig } from "next";

import { API_BASE_AUTH } from "@/lib/config";

const API_BASE = API_BASE_AUTH;

const nextConfig: NextConfig = {
	output: 'export',
	images: {
		unoptimized: true
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${API_BASE}/:path*`,
			},
		]
	},
};

export default nextConfig;