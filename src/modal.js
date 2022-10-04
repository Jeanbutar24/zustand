import {
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

const BasicUsage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState();
  const [ttl, setTtl] = useState();
  const [tgl, setTl] = useState();
  const { setText, setTgl, setTitle } = store((state) => state);
  const handleClick = () => {
    setTitle(ttl);
    setTgl(tgl);
    setText(value);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <InputGroup size="md" marginBottom={5}>
              <Input
                pr="4.5rem"
                type="text"
                variant="flushed"
                placeholder="Set Title"
                onChange={(e) => setTtl(e.target.value)}
              />
            </InputGroup>
            <InputGroup size="md" marginBottom={5}>
              <Input
                pr="4.5rem"
                type="date"
                variant="flushed"
                onChange={(e) => setTl(e.target.value)}
              />
            </InputGroup>
            <ReactQuill
              modules={modules}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              OKE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default BasicUsage;
