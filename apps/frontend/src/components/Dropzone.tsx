import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Text, VStack } from "@chakra-ui/react";
import { blobToBase64, getDeviceId, resizeImage } from "../util";
import { useWallet } from "@vechain/dapp-kit-react";
import { submitReceipt } from "../networking";
import { useDisclosure, useSubmission } from "../hooks";

export const Dropzone = () => {
  const { account } = useWallet();

  const { setIsLoading, setResponse } = useSubmission();
  const { onOpen } = useDisclosure();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onFileUpload(acceptedFiles); // Pass the files to the callback
    },
    maxFiles: 1, // Allow only one file
    accept: {
      "image/*": [], // Accept only image files
    },
  });

  const onFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length > 1 || files.length === 0) {
        alert("Please upload only one file");
        return;
      }

      if (!account) {
        alert("Please connect your wallet");
        return;
      }

      setIsLoading(true);
      onOpen();

      const file = files[0];

      const resizedBlob = await resizeImage(file);
      const base64Image = await blobToBase64(resizedBlob as Blob);

      const deviceID = await getDeviceId();

      try {
        const response = await submitReceipt({
          address: account,
          deviceID,
          image: base64Image,
        });

        console.log(response);

        setResponse(response);
      } catch (error) {
        alert("Error submitting receipt");
      } finally {
        setIsLoading(false);
      }
    },
    [account, onOpen, setIsLoading, setResponse],
  );

  return (
    <VStack w={"full"} mt={3}>
      <Box
        {...getRootProps()}
        p={5}
        border="2px"
        borderColor={isDragActive ? "green.300" : "gray.300"}
        borderStyle="dashed"
        borderRadius="md"
        bg={isDragActive ? "green.100" : "#2D2D2F"}
        textAlign="center"
        cursor="pointer"
        _hover={{
          borderColor: "green.500",
          bg: "green.50",
        }}
        w={"full"}
        h={"250px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <input {...getInputProps()} />
        <VStack spacing={4}>
          <VStack spacing={2}>
            <Text fontSize="xl" fontWeight="bold" color="green.100">
              Upload Receipt to Scan
            </Text>
            <Text fontSize="sm" color="white">
              Drag and drop your receipt image here, or click to select a file
            </Text>
            <Text fontSize="xs" color="white">
              Supported formats: JPG, PNG, GIF (Max size: 5MB)
            </Text>
          </VStack>
        </VStack>
      </Box>
    </VStack>
  );
};
