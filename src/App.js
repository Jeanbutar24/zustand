import React, { useState } from "react";
import "./App.css";
import {
  Box,
  Button,
  ChakraProvider,
  Grid,
  GridItem,
  Select,
  Text,
} from "@chakra-ui/react";
import { Data } from "./data";
import BasicUsage from "./modal";
import parse from "html-react-parser";
import { store } from "./store";
import { DATA } from "./mockdata";
const App = () => {
  const [index, setIndex] = useState();
  const { text, title, tgl } = store((state) => state);
  const handleClick = (id) => {
    const index = DATA.findIndex((i) => i.id === id);
    setIndex(index);
  };

  return (
    <ChakraProvider>
      <Box
        padding="20px"
        margin={"0px 0px 0px 90px"}
        backgroundColor={"#E8F9FD"}
        border="1px solid #59CE8F"
      >
        <Grid
          h="100vh"
          templateRows="repeat(8, 1fr)"
          templateColumns="repeat(6, 1fr)"
        >
          <GridItem rowSpan={8} colSpan={1} overflow={"scroll"} id="scrollBar">
            <Box rowSpan={1} marginTop={5} border="1px solid black">
              <Select
                placeholder="Filter"
                fontSize={15}
                textTransform="uppercase"
                fontWeight={"bold"}
                borderRadius="none"
              >
                <option value="option1">Tanggal</option>
                <option value="option2">Pembuat</option>
                <option value="option3">Test</option>
              </Select>
            </Box>
            {DATA.map((i, index) => (
              <Box
                key={index}
                cursor="pointer"
                border="1px solid teal"
                backgroundColor={"white"}
                marginTop={15}
                color="black"
                paddingLeft={15}
                fontWeight="500"
                onClick={() => handleClick(i.id)}
              >
                <Text>{i.tgl}</Text>
                <Text>{i.title}</Text>
              </Box>
            ))}
          </GridItem>
          <GridItem colSpan={5} rowSpan={8}>
            <Grid templateRows={"repeat(8, 1fr)"} h="100%">
              <GridItem
                rowSpan={1}
                display={"flex"}
                justifyContent="end"
                alignItems={"center"}
              >
                <Button marginRight={5} colorScheme="blue">
                  Edit
                </Button>
                <Button marginRight={5} colorScheme="blue">
                  Save
                </Button>
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
                  border="1px solid teal"
                >
                  <GridItem
                    rowSpan={1}
                    display={"flex"}
                    justifyContent="center"
                    fontSize={23}
                    fontWeight="bold"
                    color={"black"}
                    textTransform="uppercase"
                  >
                    {DATA[index]?.title ? DATA[index]?.title : title}
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    display={"flex"}
                    justifyContent="end"
                    marginRight={15}
                    fontSize={20}
                    fontWeight="bold"
                    color={"black"}
                  >
                    {DATA[index]?.tgl ? DATA[index]?.tgl : tgl}
                  </GridItem>
                  <GridItem
                    rowSpan={6}
                    fontSize="17px"
                    margin={5}
                    color={"black"}
                    fontFamily="sans-serif"
                  >
                    {DATA[index]?.text ? parse(DATA[index]?.text) : parse(text)}
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem
                rowSpan={1}
                display={"flex"}
                justifyContent="end"
                position="relative"
              >
                <Box
                  position={"absolute"}
                  top="-60px"
                  right={"80px"}
                  boxShadow="dark-lg"
                  borderRadius={10}
                >
                  <BasicUsage />
                </Box>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default App;
