import { Button, Container, Stack, Skeleton } from "@chakra-ui/react";
import "./App.css";
import Product from "./components/product";
import axios from "axios";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const onShowProducts = async () => {
    setLoading(true);
    setProducts([]);
    const { data } = await axios.get('/api/products');
    setProducts(data);
    setLoading(false);
  };
 
  return (
    <>
      <Container maxW="md" color="black">
        <Button colorScheme="teal" size="lg" m={5} onClick={onShowProducts}>
          Get Products
        </Button>
        {loading && (
          <Stack>
            <Skeleton height='200px' />
            <Skeleton height='200px' />
            <Skeleton height='200px' />
            <Skeleton height='200px' />
            <Skeleton height='200px' />
            <Skeleton height='200px' />
          </Stack>
        )}
        <Stack spacing={8} direction="column">
          {products.map((prod) => (
            <Product
              key={prod.id}
              name={prod.name}
              description={prod.description}
              price={prod.price}
            />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export default App;
