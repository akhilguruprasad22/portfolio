import '../stylesheets/App.css';
import Header from './Header.js';
import { Route, Routes, useLocation } from "react-router-dom";
import ContactMeSection from "./ContactMeSection.js";
import LandingSection from "./LandingSection.js";
import ProjectsSection from "./ProjectsSection.js";
import { ChakraProvider, Text, VStack, extendTheme } from '@chakra-ui/react';
import { AlertProvider } from '../context/alertContext.js';
import Alert from './Alert.js';
import Footer from './Footer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGhost, faSnowflake, faToriiGate, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faJediOrder } from '@fortawesome/free-brands-svg-icons';

const homeEP = '/';
const projectsEP = '/projects';
const contactEP = '/contact';

function getHeading(location) {
  switch(location.pathname) {
    case homeEP:
      return 'Hello!';
    case contactEP:
      return 'Get in touch';
    case projectsEP:
      return 'Projects';
    default:
      return "Nothing here.";
  }
}

function App() {
  const location = useLocation();
  const heading = getHeading(location);

  return (
    <ChakraProvider theme={extendTheme({
      fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Raleway', sans-serif`,
      },
    })}>
      <AlertProvider>
        <div className="App">
          <VStack spacing={0}>
            <Header/>
            <VStack className='main-heading'>
              <Text className='heading' as='b' fontSize='7xl'>{heading==='Nothing here.' ? <FontAwesomeIcon icon={faTriangleExclamation} size='xs'/> : <FontAwesomeIcon icon={faGhost} size='xs'/>} {heading}</Text>
            </VStack>
            <main className='content-body'>
              <section>
                <Routes>
                    <Route path={homeEP} element={<LandingSection />} />
                    <Route path={contactEP} element={<ContactMeSection />} />
                    <Route path={projectsEP} element={<ProjectsSection />} />
                </Routes>
              </section>
            </main>
            <Footer />
            <Alert />
          </VStack>  
        </div>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
