import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, Heading, Text, VStack, useToast } from "@chakra-ui/react";
import { FaSignInAlt } from "react-icons/fa";
import { Image } from "@chakra-ui/react";

const IndexPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backengine-hkhk.fly.dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      toast({
        title: "Error logging in",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <Box padding="4" maxW="md" width="full">
        <VStack spacing={8} mb={6} align="stretch">
          <Heading>Interactive API - Login</Heading>
          <Image src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB1aXxlbnwwfHx8fDE3MDk2Mzg4MTl8MA&ixlib=rb-4.0.3&q=80&w=1080" boxSize="150px" borderRadius="full" />
        </VStack>

        <VStack spacing={4} align="stretch">
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" placeholder="Enter your email" onChange={(event) => setEmail(event.currentTarget.value)} />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" onChange={(event) => setPassword(event.currentTarget.value)} />
          </FormControl>

          <Button leftIcon={<FaSignInAlt />} colorScheme="blue" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Box>
      <Text fontSize="xs" mt={6}>
        Interactive API Health Check Status: <HealthCheck />
      </Text>
    </Container>
  );
};

const HealthCheck = () => {
  const [status, setStatus] = useState("checking...");

  React.useEffect(() => {
    fetch("https://backengine-hkhk.fly.dev/healthcheck")
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then(() => setStatus("API is up and running"))
      .catch(() => setStatus("API is down"));
  }, []);

  return <span>{status}</span>;
};

export default IndexPage;
