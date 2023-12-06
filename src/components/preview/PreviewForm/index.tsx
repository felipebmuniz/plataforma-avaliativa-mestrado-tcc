import { useEffect } from "react";
import { useForms } from "@/hooks";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Radio,
  RadioGroup,
  SkeletonCircle,
  SkeletonText,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { useTheme } from "@emotion/react";

const PreviewForm = ({ formId }: { formId: string }) => {
  const theme = useTheme();
  const { formByID, isLoadingShow, showFormsByID } = useForms();

  useEffect(() => {
    showFormsByID(formId);
  }, []);

  return (
    <VStack
      alignItems="flex-start"
      justifyContent="flex-start"
      flexDir="column-reverse"
      gap="3rem"
      h="100%"
      w="100%"
      maxW="1100px"
      m="auto"
    >
      {!isLoadingShow ? (
        formByID?.questions?.map((question, index) => (
          <Card w="100%" p="1rem" key={`qst-${question.id}`}>
            <CardHeader>
              <Heading size="md">{question?.statement}</Heading>
            </CardHeader>

            <CardBody>
              <Box m="auto" width="90%" p="2rem 1rem">
                <RadioGroup>
                  <Stack
                    spacing={5}
                    direction="row"
                    justifyContent="space-between"
                  >
                    {question?.options?.map((option) => (
                      <Radio key={option?.id} value={option?.id}>
                        {option?.value}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>
            </CardBody>
          </Card>
        ))
      ) : (
        <Box
          padding="6"
          boxShadow="lg"
          bg={theme.background500}
          w="18.75rem"
          h="18.75rem"
          borderRadius="0.5rem"
          width="100%"
        >
          <SkeletonText
            mt="4"
            noOfLines={6}
            spacing="4"
            skeletonHeight="2"
            alignItems={"center"}
          />
        </Box>
      )}
    </VStack>
  );
};

export default PreviewForm;
