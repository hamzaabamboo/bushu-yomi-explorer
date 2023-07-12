const ghPages = process.env.DEPLOY_TARGET === "gh-pages";

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: ghPages ? "/onpu-explorer" : process.env.NEXT_PUBLIC_BASE_URL || "",
    output: 'export',
}

module.exports = nextConfig
