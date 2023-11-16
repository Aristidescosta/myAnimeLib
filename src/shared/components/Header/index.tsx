import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TNavbarItem } from "../../types/NavbarItem";
import NavigationBar from "./NavgationBar";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { StorageEnum, getData } from "../../database/LocalStorageDAO";
import { APP_COLOR, APP_VARIANT_COLOR, OPTIONS } from "../../utils/constants";
import { useTheBounce } from "../../hooks/hooks";
import { WindowSize } from "../Featured/FeaturedScreen";
import { useWindowMeasure } from "../../states/useWindowMeasure";

interface IHeader {
  navbar: TNavbarItem[];
}

export const Header: React.FC<IHeader> = ({ navbar }) => {
  const isBase = useBreakpointValue({ base: true, md: true, lg: false });
  const user = getData(StorageEnum.Login);
  const username = user ? user.split("@")[0] : null;
  const { theBounce } = useTheBounce();
  const { onClose } = useDisclosure();
  const [choice, setChoice] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { md } = useWindowMeasure();
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/search?q=${search}`);
    setSearch("");
  };

  const handleChangeChoice = (choice: string) => {
    setChoice(choice);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setWindowSize]);

  useEffect(() => {
    theBounce(() => {
      if (!search) return;
      navigate(`/search?q=${search}`);
    });
  }, []);

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={["20", "96px"]}
        mx={["2", "8"]}
      >
        <Box as={Link} display={"flex"} alignSelf={"center"} to={"/"}>
          <Text as={"h1"} textTransform={"capitalize"}>
            AnimeLib
          </Text>
        </Box>
        <NavigationBar items={navbar} isBase={isBase || false} />
        <HStack display={"flex"} justify={"space-between"}>
          <form onSubmit={handleSubmit}>
            <FormControl display={"flex"} gap={2}>
              <Select
                defaultValue={choice}
                onChange={(e) => handleChangeChoice(e.target.value)}
                size={windowSize.width <= md ? "xs" : "md"}
              >
                {OPTIONS.map((optionSelect, key) => (
                  <option
                    key={key}
                    style={{ color: APP_COLOR }}
                    value={optionSelect.value}
                  >
                    {optionSelect.title}
                  </option>
                ))}
              </Select>
              <InputGroup size={windowSize.width <= md ? "xs" : "md"}>
                <InputRightElement pointerEvents={"none"}>
                  <SearchIcon color={"grey.300"} />
                </InputRightElement>
                <Input
                  type="search"
                  placeholder="Pesquise por um anime, mangá ou personagem"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
            </FormControl>
          </form>

          {user ? (
            <Menu onClose={onClose}>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
                  <Avatar
                    name={username}
                    src="https://github.com/Aristidescosta.png"
                  />
                  <Text fontSize={"small"}>Aristides Costa</Text>
                </Flex>
                <MenuButton
                  as={Button}
                  aria-label="Options"
                  rightIcon={<ChevronDownIcon />}
                  variant="outline"
                  border={"none"}
                  _hover={{
                    bg: "transparent",
                  }}
                  color={"FFF"}
                />
              </Flex>

              <MenuList zIndex={99999999} color={APP_COLOR}>
                <MenuItem as={"a"} href="/perfil">
                  Perfil
                </MenuItem>
                <MenuItem as={"a"} href="/logout">
                  Sair
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              border={`1px solid ${APP_VARIANT_COLOR}`}
              color={APP_VARIANT_COLOR}
              borderRadius={"8"}
              display={["none", "flex"]}
              alignSelf={"center"}
              background="transparent"
              _hover={{
                bg: "transparent",
              }}
              fontSize={["2px, 8px, 19px"]}
              as={Link}
              to={"/entrar"}
            >
              Entrar
            </Button>
          )}
        </HStack>
      </Box>
    </Box>
  );
};
