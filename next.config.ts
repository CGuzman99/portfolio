import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Reads ./i18n/request.ts, next-intl's default path.
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
