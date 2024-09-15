import { Image, ImageProps, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
  beBetterProps?: ImageProps;
  veBetterProps?: ImageProps;
};

/**
 * BeBetterVeBetterIcon displays the BeBetterVeBetter logo
 */
export const BeBetterVeBetterIcon: React.FC<Props> = ({
  beBetterProps,
}) => (
  <VStack spacing={2} align="flex-start" w="full">
    <Image src="/logo.png" {...beBetterProps} />
  </VStack>
);
