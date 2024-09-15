import {
  Box,
  Card,
  Image,
  VStack,
  Text,
  Flex,
  UnorderedList,
  ListItem
} from "@chakra-ui/react";

export const InfoCard = () => {
  return (
    <Flex w="full" direction={{ base: "column", md: "row" }} gap={4}>
      <Card flex={1}>
        <VStack align="start" justify="space-between" h="100%" p={4}>
          <VStack align="start" spacing={3} w="100%">
            <Text fontSize="xl" fontWeight="bold" color="green.100">
              Why Shop Thrift?
            </Text>
            <Text>
              Fashion industry produces <b>2.7% of global CO2</b> emissions (<b>1.2 Bn tonnes</b>). Shop thrift to reduce your carbon footprint.
            </Text>
            <UnorderedList pl={4} spacing={1}>
              <ListItem>Reduce waste and carbon footprint</ListItem>
              <ListItem>Support local economies and charities</ListItem>
              <ListItem>Find unique, one-of-a-kind pieces</ListItem>
              <ListItem>Save money while being eco-friendly</ListItem>
            </UnorderedList>
            <Image 
              src="/levis.png" 
              alt="Levi's" 
              w="120%" 
              h="auto" 
              maxH="250px" 
              objectFit="contain" 
            />
          </VStack>
        </VStack>
      </Card>

      <Card flex={1}>
        <Box p={3}>
          <Image src="/meme.png" borderRadius={16} w="full" h="auto" objectFit="cover" />
        </Box>
      </Card>
    </Flex>
  );
};
