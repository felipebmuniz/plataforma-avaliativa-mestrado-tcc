import React from "react";
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import { BiSync } from "react-icons/bi";

const OptionsTableUI = ({ children }: { children: React.ReactNode }) => {
  return (
    <HStack marginLeft={"3.5rem"}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<BiSync size="1.5rem" />}
          h="3rem"
          py="1rem"
          px="1rem"
          variant="outline"
        />

        <MenuList>{children}</MenuList>
      </Menu>
    </HStack>
  );
};

export default OptionsTableUI;
