import { Box, Container, HStack, Image, Text } from "@chakra-ui/react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { keyframes } from "@emotion/react";
// Define the marquee animation
const marquee = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

export const Navbar = () => {
  return (
    <Box
      px={0}
      position={"sticky"}
      top={0}
      zIndex={10}
      py={4}
      h={"auto"}
      w={"full"}
      bg={"black"}
    >
      <Container
        w="full"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems={"center"}
        maxW={"container.xl"}
      >
        <HStack flex={1} justifyContent={"start"}>
          <Image
            src="/logo.png"
            h="80px" // Adjust this value to make the logo shorter
            w="auto" // Maintain aspect ratio
            objectFit="contain"
            borderRadius="md" // Add rounded edges
          />
        </HStack>

        <HStack flex={1} spacing={4} justifyContent={"end"}>
          <ConnectWalletButton />
        </HStack>
      </Container>
      <br></br>
      <Box
        overflow="hidden"
        bg="green.100"
        py={2}
        position="sticky"
        top="100px"
        zIndex="sticky"
      >
        <Text
          whiteSpace="nowrap"
          display="inline-block"
          animation={`${marquee} 20s linear infinite`}
          color="green.800"
          fontWeight="bold"
        >
          Did you know? A single T-shirt produces 7kg of CO2, while a pair of
          jeans generates 33kg of CO2. Shop thrift to reduce your carbon
          footprint, #WearWisely!
        </Text>
      </Box>
    </Box>
  );
};
