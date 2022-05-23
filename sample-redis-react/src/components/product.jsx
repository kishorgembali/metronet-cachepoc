import { Box, Heading, Text } from "@chakra-ui/react";
import { Stack, VStack } from "@chakra-ui/react";

const Product = ({ name, price, description }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px">
      <Heading fontSize="xl">{name}</Heading>
      <Text mt={4}>{description}</Text>
      <Text mt={4}>${price}</Text>
    </Box>
  );
};

export default Product;
