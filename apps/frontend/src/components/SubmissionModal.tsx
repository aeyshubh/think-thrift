import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalOverlay,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useDisclosure, useSubmission } from "../hooks";
import loaderAnimation from "../assets/lottie/loader-json.json";
import Lottie from "react-lottie";
import { AirdropIcon, AlertIcon } from "./Icon";
import { useMemo } from "react";
import Confetti from "react-confetti";

export const SubmissionModal = () => {
  const { isLoading, response } = useSubmission();
  const { isOpen, onClose } = useDisclosure();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (response?.validation.validityFactor === 1) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  const renderContent = useMemo(() => {
    const isValid = response?.validation.validityFactor === 1;
    const amount = response?.validation.amount ?? 0;
    const rewardAmount = Math.abs(amount * 0.1);
    return isValid ? (
      <VStack
        bg="black"
        minH={"40vh"}
        minW={"40vh"}
        borderRadius={16}
        justifyContent={"center"}
        alignItems={"center"}
        position="relative"
        overflow="hidden" // Add this line
      >
        {showConfetti && (
          <Confetti
            width={400} // Set a fixed width
            height={400} // Set a fixed height
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
        <AirdropIcon size={200} color="#373EDF" />

        <Text fontSize={32} fontWeight={600}>
          Congratulations!
        </Text>
        <HStack>
          <Text
            fontSize={24}
            fontWeight={400}
            textAlign={"center"}
            color={"F5EDCE"}
          >
            You've earned{" "}
            <Text as="span" color="#58287F" fontWeight={700}>
              {rewardAmount} $B3TR
            </Text>{" "}
            tokens on your purchase of{" "}
            <Text as="span" color="#58287F" fontWeight={700}>
              ${amount}
            </Text>
            !
          </Text>
        </HStack>
      </VStack>
    ) : (
      <VStack
        bg="black"
        minH={"40vh"}
        minW={"40vh"}
        borderRadius={16}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AlertIcon size={200} color="#D23F63" />
        <Text fontSize={32} fontWeight={600}>
          Oops! AI says
        </Text>
        <HStack px={4}>
          <Text fontSize={14} fontWeight={400} textAlign={"center"}>
            {response?.validation.descriptionOfAnalysis}
          </Text>
        </HStack>
      </VStack>
    );
  }, [response, showConfetti]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      trapFocus={true}
      isCentered={true}
      closeOnOverlayClick={!isLoading}
    >
      <ModalOverlay />
      <ModalContent minH={"40vh"} minW={"40vh"} borderRadius={16}>
        {isLoading ? (
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loaderAnimation,
            }}
          />
        ) : (
          renderContent
        )}
      </ModalContent>
    </Modal>
  );
};
