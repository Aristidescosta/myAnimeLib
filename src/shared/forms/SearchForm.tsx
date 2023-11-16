import { SearchIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import React from "react";

import { APP_COLOR, OPTIONS } from "../utils/constants";

interface ISearchFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChangeChoice: (choice: string) => void;
  isMobile: boolean;
  search: string;
  choice: string;
  setSearch: (search: string) => void;
}

export const SearchForm: React.FC<ISearchFormProps> = ({
  handleChangeChoice,
  handleSubmit,
  setSearch,
  isMobile,
  search,
  choice,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormControl display={"flex"} gap={2}>
        <Select
          defaultValue={choice}
          onChange={(e) => handleChangeChoice(e.target.value)}
          size={isMobile ? "xs" : "lg"}
          w={isMobile ? "54" : undefined}
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
        <InputGroup size={isMobile ? "xs" : "lg"} w={isMobile ? "54" : undefined}>
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
  );
};
