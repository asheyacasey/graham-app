/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            },
        ],
        loader: 'akamai',
        path: '',
        unoptimized: true,
    },
    experimental: {
        esmExternals: false
    },
    webpack: (config) => {
        config.ignoreWarnings = [
          { module: /src\/ui\/components\/Pagination\.jsx/ },
          { file: /src\/app\/buyer-account\/orders\/page\.tsx/ },
        ];    
        return config;
      },
    output: 'export'
}

module.exports = nextConfig
