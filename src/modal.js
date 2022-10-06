import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { store } from "./store";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["clean"],
  ],
};

const BasicUsage = ({ data, type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");
  const [ttl, setTtl] = useState("");
  const [tgl, setTl] = useState("");
  const { setText, setTgl, setTitle } = store((state) => state);
  const handleClick = () => {
    setTitle(ttl === "" ? data?.title : ttl);
    setTgl(tgl);
    setText(value);
    setTtl("");
    setTl("");
    onClose();
  };
  const handleOpen = () => {
    onOpen();
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        colorScheme={type !== "edit" && "blue"}
        fontWeight={500}
        color={type === "edit" ? "black" : "white"}
        border={type === "edit" ? "none" : "1px outset white"}
        boxShadow={
          type === "edit" ? "none" : "0px 1px 1px 0px rgba(0,0,0,0.75)"
        }
      >
        {type === "edit" ? "Edit" : "Add"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <InputGroup size="md" marginBottom={5}>
              <Input
                pr="4.5rem"
                type="text"
                variant="flushed"
                placeholder="Set Title"
                defaultValue={data ? data?.title : ttl}
                onChange={(e) => setTtl(e.target.value)}
              />
            </InputGroup>
            <InputGroup size="md" marginBottom={5}>
              <Input
                pr="4.5rem"
                type="date"
                variant="flushed"
                defaultValue={data ? data?.tgl : tgl}
                onChange={(e) => setTl(e.target.value)}
              />
            </InputGroup>
            {type === "edit" ? (
              <ReactQuill
                modules={modules}
                theme="snow"
                defaultValue={data ? data?.text : value}
                onChange={setValue}
              />
            ) : (
              <ReactQuill
                modules={modules}
                theme="snow"
                value={value}
                onChange={setValue}
              />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              Submit
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default BasicUsage;
