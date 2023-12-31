import { useCallback, useEffect } from "react";
import { ButtonGroup, HStack, VStack } from "@chakra-ui/react";

import { ButtonUI } from "@/components/UI/ButtonUI";
import { InputUI } from "@/components/UI/InputUI";
import { SelectUI } from "@/components/UI/SelectUI";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { BiSearch } from "react-icons/bi";
import { DrawerCreateUsers } from "@/components/UI/drawers/DrawerCreateUsers";
import { SkeletonCards } from "@/components/UI/Skeleton";
import { userType } from "@/types/users";
import { useUsers } from "@/hooks";
import { TableUI } from "@/components/UI/TableUI";
import ModalAlert from "@/components/UI/Modals/ModalAlert";
import ButtonSyncTableUI from "@/components/UI/ButtonSyncTableUI";

const defaultValues: { search: string; filter1: string; filter2: string } = {
  search: "",
  filter1: "",
  filter2: "",
};

const schemaCreateFilterEvaluationArea = yup.object({
  search: yup.string().required("Deve buscar por alguma turma!"),
  filter1: yup
    .string()
    .when("search", {
      is: (value: string) => value != "",
      then: (schema) => schema.required("Necessário selecionar um valor!"),
    })
    .typeError("Valor inválido!"),
  filter2: yup
    .string()
    .when("filter1", {
      is: (value: string) => value != "",
      then: (schema) => schema.required("Necessário selecionar um valor!"),
    })
    .typeError("Valor inválido!"),
});

interface IUsersAdmin {
  usersType: userType;
}

export const UsersAdmin = ({ usersType }: IUsersAdmin) => {
  const {
    listUser,
    isLoadingStudent,
    isLoadingTeacher,
    usersStudent,
    usersTeacher,
    deleteUser,
  } = useUsers();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schemaCreateFilterEvaluationArea),
    mode: "all",
  });

  useEffect(() => {
    usersType === "student" && usersStudent.length <= 0 && listUser(usersType);
  }, [usersType, listUser, usersStudent.length]);

  useEffect(() => {
    usersType === "teacher" && usersTeacher.length <= 0 && listUser(usersType);
  }, [usersType, listUser, usersTeacher.length]);

  function onSubmit(values: any) {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  }

  const renderCardsUsers = useCallback(() => {
    switch (usersType) {
      case "student":
        return !isLoadingStudent && usersStudent ? (
          <>
            <TableUI
              data={usersStudent.map((user) => {
                return {
                  ...user,
                  options: (
                    <ModalAlert
                      ModalText="Certeza em realizar a ação de deletar Usuário?"
                      ModalTitle="Deletar Usuário"
                      ModalTextButtonConfirm="Deletar"
                      type="iconButtonDelete"
                      onChange={() => {
                        deleteUser(user.userId, "student");
                      }}
                    />
                  ),
                };
              })}
              columns={[
                "userId",
                "studentId",
                "name",
                "email",
                "studentCode",
                "validated",
                "options",
              ]}
              title="Usuários cadastrados"
            />
          </>
        ) : (
          <SkeletonCards />
        );

      case "teacher":
        return !isLoadingTeacher && usersTeacher ? (
          <>
            <TableUI
              data={usersTeacher.map((user) => {
                return {
                  ...user,
                  options: (
                    <ModalAlert
                      ModalText="Certeza em realizar a ação de deletar Usuário?"
                      ModalTitle="Deletar Usuário"
                      ModalTextButtonConfirm="Deletar"
                      type="iconButtonDelete"
                      onChange={() => {
                        deleteUser(user.userId, "teacher");
                      }}
                    />
                  ),
                };
              })}
              columns={[
                "userId",
                "teacherId",
                "name",
                "email",
                "teacherCode",
                "validated",
                "options",
              ]}
              title="Usuários cadastrados"
            />
          </>
        ) : (
          <SkeletonCards />
        );

      default:
        return <SkeletonCards />;
    }
  }, [
    usersType,
    usersStudent,
    usersTeacher,
    isLoadingTeacher,
    isLoadingStudent,
  ]);

  return (
    <VStack
      alignItems="flex-start"
      justifyContent="flex-start"
      gap="1.5rem"
      h="100%"
      w="100%"
    >
      <HStack
        as="form"
        id="my-form-search-forms-users"
        w="100%"
        alignItems="flex-end"
        justifyContent="space-between"
        gap="2rem"
        marginTop="1.5rem"
      >
        <HStack w="100%" alignItems="flex-start">
          {/* <InputUI
            register={register}
            errors={errors}
            name="search"
            label="Turma"
            type="text"
            placeholder="Busque pelo nome da Turma"
            icon={<BiSearch />}
            iconPosition="right"
          />

          <SelectUI
            control={control}
            errors={errors}
            name="filter1"
            label="Turma"
            placeholder="Busque pelo nome da Turma"
          />

          <SelectUI
            control={control}
            errors={errors}
            name="filter2"
            label="Turma"
            placeholder="Busque pelo nome da Turma"
          /> */}
        </HStack>

        <ButtonGroup gap="1rem" margin="auto" marginTop="2rem" height="inherit">
          {/* <ButtonUI
            form="my-form-search-forms-users"
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Buscar
          </ButtonUI> */}
          <ButtonSyncTableUI onClick={() => listUser(usersType)} />
          <DrawerCreateUsers type={usersType} />
        </ButtonGroup>
      </HStack>
      {renderCardsUsers()}
    </VStack>
  );
};
