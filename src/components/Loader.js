import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { VStack, Text } from "@chakra-ui/react";
import "../stylesheets/Loader.css";

function Loader() {
    return (
    <VStack className="loader">
        <FontAwesomeIcon icon={faSpinner} spinPulse/>
    </VStack>
    );
}

export default Loader;