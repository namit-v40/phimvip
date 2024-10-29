import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'phimimg.com',
                port: ''
            }],
        },
    reactStrictMode: true
};

export default withNextIntl(nextConfig);
