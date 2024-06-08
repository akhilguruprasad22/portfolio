import React from "react";
import { Flex, HStack, VStack } from "@chakra-ui/react";
import "../stylesheets/Footer.css";

const Footer = () => {
  return (
    <HStack className="footer-container">
      <footer>
        <VStack>
          <HStack className="footer-credits-container">
            <p className="credits">Artwork by <a href="https://www.heartovercrown.com/" target="_blank" rel="noreferrer" aria-label="Link to heartovercrown Website in a new tab">Shyama Kuver</a></p>
          </HStack>
          <Flex className="footer-owner">
            <p>Akhil © 2024</p>
          </Flex>
        </VStack>
      </footer>
    </HStack>
  );
};
export default Footer;
