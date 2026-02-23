import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'www.zieloneslaskie.pl',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
