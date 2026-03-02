/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@chakra-ui/react",
      "@chakra-ui/icons",
      "@nextui-org/react",
    ],
  },
};

export default nextConfig;
