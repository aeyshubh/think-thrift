import { Box, Card, Text, Flex, VStack, Image } from "@chakra-ui/react";
import { Dropzone } from "../Dropzone";
const Steps = [
  {
    icon: "/steps/2.svg",
    title: "Upload the receipt of your purchase",
    description: "Upload your receipt and AI will verify the purchase.",
  },
  {
    icon: "/steps/3.svg",
    title: "Earn B3TR for your purchase",
    description: "Earn B3TR for your purchase and help the environment.",
  },
];

export const Instructions = () => {
  return (
    <Card mt={3} w="full">
      <Flex
        p={4}
        w="100%"
        direction={{ base: "column", md: "row" }}
        minH="250px"
      >
        <Box flex="1" px={2}>
          <VStack align="start" spacing={4} h="full">
            <Text fontSize="xl" fontWeight="bold" color="green.100">
              How It Works
            </Text>
            {Steps.map((step, index) => (
              <Flex key={index} align="start">
                <Image
                  src={step.icon}
                  alt={`Step ${index + 1}`}
                  boxSize="24px"
                  mr={3}
                />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="semibold">{step.title}</Text>
                  <Text
                    fontSize="sm"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </VStack>
              </Flex>
            ))}
          </VStack>
        </Box>
        <Box flex="1" px={2}>
          <Dropzone />
        </Box>
      </Flex>
    </Card>
  );
};
