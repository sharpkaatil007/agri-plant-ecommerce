// components/Navbar.js
import {
  Flex,
  Heading,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "../lib/api";       // ✅ named import matches helper
import { FaShoppingCart } from "react-icons/fa";
import useCartStore from "../store/cartStore";

export default function Navbar() {
  const cart = useCartStore((s) => s.cart);
  const [cats, setCats] = useState(null);

  useEffect(() => {
    getCategories()
      .then(setCats)
      .catch((e) => console.error("Failed to load categories:", e));
  }, []);

  return (
    <Flex as="nav" align="center" p={4} bg="transparent" color="white">
      {/* Brand */}
      <NextLink href="/" passHref legacyBehavior>
        <Heading
          as="a"
          size="lg"
          _hover={{ color: "teal.300", cursor: "pointer" }}
        >
          AgriPlant
        </Heading>
      </NextLink>

      <Spacer />

      {/* Categories dropdown */}
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          mr={4}
          colorScheme="teal"
          variant="outline"
        >
          Categories
        </MenuButton>
        <MenuList bg="gray.800" borderColor="gray.700">
          {!cats
            ? [...Array(3)].map((_, i) => (
                <Skeleton key={i} height="30px" bg="gray.700" />
              ))
            : cats.map((c) => (
                <NextLink key={c.id} href={`/category/${c.slug}`} passHref legacyBehavior>
                  <MenuItem
                    as="a"
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                    textTransform="capitalize"
                    color="white"
                  >
                    {c.name}
                  </MenuItem>
                </NextLink>
              ))}
        </MenuList>
      </Menu>

      {/* List page */}
      <NextLink href="/products" passHref legacyBehavior>
        <Button as="a" variant="outline" colorScheme="teal" mr={4}>
          Products
        </Button>
      </NextLink>

      {/* Login */}
      <NextLink href="/login" passHref legacyBehavior>
        <Button as="a" variant="outline" colorScheme="yellow" mr={4}>
          Login
        </Button>
      </NextLink>

      {/* Cart */}
      <NextLink href="/cart" passHref legacyBehavior>
        <Button as="a" colorScheme="yellow" leftIcon={<FaShoppingCart />}>
          Cart&nbsp;({cart.length})
        </Button>
      </NextLink>
    </Flex>
  );
}
