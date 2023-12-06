import { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormErrorMessage,
  HStack,
  Heading,
  List,
  ListIcon,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useTheme } from "@emotion/react";
import { hexToRgb } from "@/utils/theme";
import { BiInfoCircle } from "react-icons/bi";

import { ButtonUI } from "@/components/UI/ButtonUI";
import { useAuth, useForms } from "@/hooks";
import { SkeletonCards } from "@/components/UI/Skeleton";
import { useRouter } from "next/router";
import { ResponseUserEvaluationForm } from "@/types/auth";

export const FormEvaluation = () => {
  const theme = useTheme();
  const toast = useToast();
  const router = useRouter();

  const [evaluationValues, setEvaluationsValues] = useState<
    ResponseUserEvaluationForm | undefined
  >();

  const [evaluationForm, setEvaluationsForm] = useState<
    Array<{ optionId: string; questionId: string }>
  >([]);

  const { dataUserEvaluationForm, setDataUserEvaluationForm } = useAuth();
  const { formByID, isLoadingShow, showFormsByID } = useForms();

  useEffect(() => {
    const auxValidate = dataUserEvaluationForm ?? {};

    if (!!Object.values(auxValidate).length) {
      console.log("[dataUserEvaluationForm] =>", dataUserEvaluationForm);
      setEvaluationsValues(() => dataUserEvaluationForm);
      const auxID = dataUserEvaluationForm?.formId ?? "";
      const auxToken = dataUserEvaluationForm?.accessToken ?? "";

      showFormsByID(auxID, auxToken, "/").then(() => {
        !formByID && setDataUserEvaluationForm(() => undefined);
      });
    } else {
      router.push("/");
    }
  }, [setDataUserEvaluationForm, showFormsByID, router, toast]);

  useEffect(() => {
    formByID &&
      setEvaluationsForm(() => {
        return formByID?.questions?.map((question) => {
          return {
            questionId: question.id,
            optionId: "",
          };
        });
      });
  }, [formByID]);

  function onSubmit(event: any, values: any) {
    event.preventDefault();
    const validate = evaluationForm.every((value) => value.optionId === "");

    const auxValues = {
      formId: evaluationValues?.formId,
      evaluationId: evaluationValues?.evaluationId,
      classId: evaluationValues?.clasId,
      answers: evaluationForm,
    };

    console.log("[onSubmit] =>", JSON.stringify(values, null, 2));
    console.log("[EvaluationForm] =>", evaluationForm);
    console.log("[auxValues] =>", auxValues);
    console.log("[validate] =>", validate);

    // validate;
  }

  return (
    <VStack
      alignItems="flex-start"
      justifyContent="flex-start"
      gap="3rem"
      h="100%"
      w="100%"
    >
      <VStack
        width="100%"
        maxW="1100px"
        gap="1.5rem"
        alignItems="inherit"
        justifyContent="inherit"
        margin="auto"
      >
        <Badge
          p={"0.25rem 1.25rem"}
          borderRadius={"0.5rem"}
          bg={hexToRgb(theme.container200, 0.3)}
          fontSize="0.8125rem"
          fontStyle="normal"
          fontWeight="500"
          lineHeight="150%"
          letterSpacing="0.13rem"
        >
          Formulário de Avaliação
        </Badge>

        <Text
          fontSize="2.25rem"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="130%"
        >
          {formByID?.name}
        </Text>

        <List spacing={3} color={theme.colorText}>
          <ListItem>
            <Center justifyContent="flex-start">
              <ListIcon
                as={BiInfoCircle}
                color={theme.colorSecundary800}
                fontSize="1.5rem"
              />
              Leia e marque a melhor opção nas perguntas levando em consideração
              sua experiencia sobre o formulário.
            </Center>
          </ListItem>
        </List>
      </VStack>

      <form onSubmit={(event) => onSubmit(event, evaluationForm)}>
        <FormControl
          isInvalid={evaluationForm.every((value) => value.optionId === "")}
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
                  {evaluationForm.length > 0 && (
                    <FormControl
                      isInvalid={evaluationForm[index]?.optionId === ""}
                    >
                      <Box m="auto" width="90%" p="2rem 1rem">
                        <RadioGroup
                          defaultValue="1"
                          onChange={(event) => {
                            setEvaluationsForm((value) =>
                              value.map((value, idx) => {
                                if (index === idx) {
                                  value.optionId = event;
                                }
                                return value;
                              }),
                            );
                          }}
                        >
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
                      <FormErrorMessage>
                        Selecione uma resposta!
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </CardBody>
              </Card>
            ))
          ) : (
            <SkeletonCards />
          )}
          <FormErrorMessage>
            Responta todas as perguntas antes de enviar!
          </FormErrorMessage>
        </FormControl>

        <Box width="100%" maxW="1100px" margin="auto">
          <HStack gap="2rem" justifyContent="flex-end">
            <ButtonUI
              bg={theme.container500}
              color={theme.container200}
              type="submit"
            >
              Enviar Avaliação
            </ButtonUI>
          </HStack>
        </Box>
      </form>
    </VStack>
  );
};
