// components/ProductCard.js
import {
  Card, CardBody, Image, Heading, Text, Stack, Button
} from "@chakra-ui/react";
import NextLink from "next/link";

export default function ProductCard({ product }) {
  return (
    <Card
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
      borderRadius="lg"
      _hover={{ borderColor: "teal.400" }}
    >
      <Image
        src={product.image || "https://source.unsplash.com/400x300/?plant"}
        alt={product.title}
        h="200px"
        w="100%"
        objectFit="cover"
      />
      <CardBody>
        <Stack spacing={3} color="gray.100">
          <Heading size="md">{product.title}</Heading>
          <Text noOfLines={2} color="gray.300">
            {product.description}
          </Text>
          <Text fontWeight="bold">₹{product.price}</Text>
          <NextLink href={`/products/${product.id}`} passHref>
            <Button colorScheme="teal">View</Button>
          </NextLink>
        </Stack>
      </CardBody>
    </Card>
  );
}
