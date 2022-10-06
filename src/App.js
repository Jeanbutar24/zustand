import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  ChakraProvider,
  Divider,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
} from "@chakra-ui/react";
import { Data } from "./data";
import BasicUsage from "./modal";
import parse from "html-react-parser";
import { store } from "./store";
import { DATA } from "./mockdata";
import { ChevronDownIcon } from "@chakra-ui/icons";

const App = () => {
  const [index, setIndex] = useState();
  const [tipe, setTipe] = useState();
  const [selectItem, setSelectitem] = useState();
  const [active, setActive] = useState({
    activeToogle: null,
  });
  const { text, title, tgl } = store((state) => state);
  /////////////////////////////////
  const handleClick = (id, item, idx) => {
    const index = DATA.findIndex((i) => i.id === id);
    setIndex(index);
    setSelectitem(item);
    setActive({ ...active, activeToogle: idx });
    setTipe(false);
  };

  const togle = (index) => {
    if (index === active.activeToogle) {
      return "active";
    } else {
      return "unactive";
    }
  };
  //////////////////////////////

  return (
    <ChakraProvider>
      <Box margin={"20px 0px 0px 0px"}>
        <Grid
          h="100vh"
          templateRows="repeat(8, 1fr)"
          templateColumns="repeat(6, 1fr)"
        >
          <GridItem
            rowSpan={8}
            colSpan={1}
            overflow={"auto"}
            backgroundColor="white"
          >
            <Box rowSpan={1} border="none" backgroundColor="white">
              <Select
                placeholder="Filter"
                fontSize={15}
                textTransform="uppercase"
                fontWeight={"bold"}
                borderRadius={"none"}
                variant="unstyled"
                padding=" 10px 15px 15px 25px"
              >
                <option value="option1">Tanggal</option>
                <option value="option2">Pembuat</option>
                <option value="option3">Test</option>1
              </Select>
            </Box>

            {DATA.map((i, index) => (
              <Box key={index}>
                <Divider width={"100%"} />
                <Box
                  cursor="pointer"
                  marginTop={15}
                  className={togle(index)}
                  padding={"5px 15px 0px 25px"}
                  fontWeight="500"
                  onClick={() => handleClick(i.id, i, index)}
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>
                    <Text fontSize={12} color="#535A53">
                      {i.tgl}
                    </Text>
                    <Text marginBottom={5} fontWeight={600} fontSize={17}>
                      {i.title}
                    </Text>
                  </Box>
                  <Menu>
                    <MenuButton
                      backgroundColor={"transparent"}
                      _hover="none"
                      _active={"none"}
                      as={Button}
                    >
                      <ChevronDownIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <BasicUsage data={selectItem} type="edit" />
                      </MenuItem>
                      <MenuItem marginLeft="16px" fontWeight={500}>
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
              </Box>
            ))}
          </GridItem>
          <GridItem colSpan={5} rowSpan={8} backgroundColor="#e3e8eb">
            <Grid templateRows={"repeat(8, 1fr)"} h="100%" gap={3}>
              <GridItem
                rowSpan={1}
                display={"flex"}
                justifyContent="end"
                alignItems={"center"}
                paddingRight="36px"
                boxShadow={"0px 0.3px 5px 0px rgba(163,150,150,0.75)"}
              >
                <Box display={"flex"} alignItems="center">
                  <Box
                    marginRight={6}
                    borderRadius={10}
                    onClick={() => setTipe(true)}
                  >
                    <BasicUsage type="add" />
                  </Box>

                  <Button
                    marginRight={5}
                    backgroundColor="white"
                    fontWeight={500}
                    color={"blue"}
                    border="1px outset whitesmoke"
                    boxShadow={"0px 1px 1px 0px rgba(0,0,0,0.75)"}
                    disabled={text === ""}
                  >
                    Save
                  </Button>
                </Box>
              </GridItem>
              <GridItem
                rowSpan={7}
                display="flex"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid
                  templateRows={"repeat(auto-fill, 1fr)"}
                  gap={1}
                  h="100%"
                  overflow={"scroll"}
                  w="90%"
                  bg="white"
                  borderRadius="5px"
                  backgroundColor="whitesmoke"
                  boxShadow={"-1px 1px 3px 0px rgba(163,150,150,0.75)"}
                >
                  <GridItem
                    rowSpan={1}
                    display={"flex"}
                    justifyContent="center"
                    fontSize={23}
                    fontWeight="600"
                    color={"#140909"}
                    textTransform="uppercase"
                    marginTop={"20px"}
                  >
                    {tipe
                      ? title
                      : DATA[index]?.title
                      ? DATA[index]?.title
                      : title}
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    display={"flex"}
                    justifyContent="end"
                    marginRight={15}
                    fontSize={17}
                    fontWeight="600"
                    color={"#535A53"}
                  >
                    {tipe ? tgl : DATA[index]?.tgl ? DATA[index]?.tgl : tgl}
                  </GridItem>
                  <GridItem
                    rowSpan={6}
                    fontSize="17px"
                    margin={5}
                    color={"black"}
                    fontFamily="sans-serif"
                  >
                    {tipe
                      ? parse(text)
                      : DATA[index]?.text
                      ? parse(DATA[index]?.text)
                      : parse(text)}
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem
                rowSpan={1}
                display={"flex"}
                justifyContent="end"
              ></GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;
