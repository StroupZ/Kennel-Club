/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        loader: "akamai",
        path: "/",
    },
    compiler: {
        styledComponents: true,
    },
}

module.exports = nextConfig
