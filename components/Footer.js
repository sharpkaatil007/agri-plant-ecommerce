// components/Footer.js
import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="gray.900" py={4} textAlign="center" color="white">
      <Text fontSize="sm">
        © {new Date().getFullYear()} AstroCommerce. All rights reserved.
      </Text>
    </Box>
  );
}
