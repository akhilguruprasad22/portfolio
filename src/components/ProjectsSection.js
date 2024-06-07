import { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import { ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, SimpleGrid, VStack, Text, Button, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faGithubAlt,
    faPython,
    faReact,
    faHtml5,
    faJs,
    faCss3Alt,
    faJava
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { useAlertContext } from "../context/alertContext.js";
import Loader from "./Loader.js";
import "../stylesheets/ProjectsSection.css";

function ProjectsSection() {
    const [response, setResponse] = useState({
        type: '',
        message: '',
        projects: [],
    });
    const username = "akhilguruprasad22";
    const githubURL = `GET /users/${username}/repos`;
    const octokit = new Octokit({ });
    const repoLanguageMapping = {
        772802313: ["Python", "C#"], //dncil
        316129087: ["Python"], //Team-6
        759356672: ["Python"], //unlock pdf
        218411064: ["Python"], //batch scheduling
        688944155: ["C#"], //products
        676264184: ["C#"], //mslearn-secure
        219202629: ["Python", "Html5", "Css3"], //mart-management
        621674067: ["Javascript", "Html5", "Css3"], //studio ghibli
        324390862: ["Python"], //rsp-consensus
        219788271: [], //sparse matrix
        186861904: ["Javascript", "Html5", "Css3"], //jswebpage
        176220606: ["Html5", "Css3"], //webpage-mini
        175069134: ["Shell"], //library
        175065279: ["Java"], //workplace taxi
        175060470: ["Python"], //cuckoo
        810382334: ["Reactjs", "Javascript", "Html5", "Css3"], //portfolio
    };
    const iconMapping = {
        "Python": faPython,
        "Css3": faCss3Alt,
        "Html5": faHtml5,
        "Shell": faTerminal,
        "Java": faJava,
        "Javascript": faJs,
        "Reactjs": faReact
    }
    const { onOpen, onClose } = useAlertContext();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        octokit.request(githubURL, {
            username: username,
            signal: abortController.signal})
        .then((res) => {
            if(res.status==200){
                setLoading(false);
                const data = res.data.toSorted(compareProjects);

                setResponse({
                    type: "success",
                    message: "Projects fetched successfully",
                    projects: data
                });
            }
            else{
                onOpen(res.type, res.message);
                setTimeout(()=>{
                    onClose();
                }, 3000);
            }
        })
        .catch((message) => {
            setResponse({...response, message: message, type: "error"});
        });

        return () => {
            abortController.abort();
        }
    }, []);

    function compareProjects(proj1,proj2){
        let proj1DateUpdated = new Date(proj1.updated_at);
        let proj2DateUpdated = new Date(proj2.updated_at);
        
        if(proj1DateUpdated >= proj2DateUpdated){
            return -1;
        }
        else{
            return 1;
        }
    }

    function goToExternalLink(url){
        if(url){
            window.open(url);
        }
    }

    return (
        loading ? <Loader /> :
        <SimpleGrid className="projects-grid-container" spacing={20}>
            {response.projects?.map((project) => {
                return (
                <Card key={project.id} className="project-card-container">
                    <CardBody>
                        <VStack spacing='6'>
                            <Heading size='md' textShadow='black 0 0 1px'>{project.name.replace(/_/g," ")}</Heading>
                            <Text fontSize='sm' textShadow='black 0 0 1px'>{project.description}</Text>
                        </VStack>
                    </CardBody>
                    <HStack className="project-card-icons" spacing={4}>
                        {
                            repoLanguageMapping[project.id]?.map(langIcon => {
                                return langIcon!="C#" ? <FontAwesomeIcon icon={iconMapping[langIcon]} title={langIcon} key={langIcon}/> : <svg viewBox="0 0 1343 1471.2" key="csharp"><title>CSharp</title><path d="M653.3 1.3C641 3 630.5 5.9 619 10.7c-4.9 2.1-63.7 34.5-130.5 72.1l-182 102.3-153 86-99 56.5c-8.8 6.2-25.4 23-31.6 32.2-10 14.6-17.1 31.5-21.1 50-1.7 8.1-1.8 23-1.8 326l1.8 326c7.4 34.5 27.1 64.7 54.1 83 3.9 2.6 41.5 24.1 83.6 47.7l484 270.1c15.3 6 29.6 8.5 48 8.6 22 0 41.1-4.4 59.4-13.6 4.4-2.2 73.7-40.9 154-86l267.1-150 141-81.3c24.4-18.9 40.6-44.9 47.7-76.6l2.3-10.4V735.8l-1.8-326c-5.9-27.7-19-51.6-38.3-70-13.9-13.2 4.5-2.5-242.4-141.2L939 130.3 801.5 53 725 11.1c-11.5-5-23.1-8.1-36.2-9.8-13.5-1.8-22.3-1.8-35.5 0zm53.8 352c50.9 4.8 96.5 18.3 142 42 37.4 19.4 69.1 43.3 100.3 75.8 8.5 8.8 27.1 30.7 27.1 31.9 0 .8-8.3 5.8-43 25.8l-80.4 46.6-15.9 9.3-10.1-9.6c-17.6-16.6-35.5-29.2-55.2-39.1-41.5-20.7-87.1-28.2-132.4-21.6-24.4 3.5-44 9.7-67.6 21.4-66.1 32.7-110.8 94.5-122 169-2.4 15.9-2.4 46.4 0 62 7.4 48.3 27.6 89.5 61 124.7 26.9 28.4 68.2 52 107.7 61.7 67.3 16.4 138.2.6 192.9-43.1 4.1-3.3 11.6-9.8 16.6-14.6l9.1-8.6 10.4 6.1 80.9 46.8 46.9 27.5c2.1 2-10.8 17.5-33.4 40-33.4 33.4-63.7 55.1-104 74.6-39.6 19-79 30.3-126.5 36.1-14 1.7-65.9 1.7-80.5 0-90.8-10.8-170.1-49.2-232.7-112.8-42.7-43.5-71.3-89.7-90.8-146.9-26.6-78.3-26.7-165.7-.2-244.5C345.5 500.3 434.7 410.7 548 372.1c25.6-8.7 57.8-15.8 83-18.2l14.5-1.4c10.4-1 47.5-.5 61.6.8zm348.4 254.5v32h32 32v-32-32h32 32v32 32h32 32v32 32h-32-32v32 32h32 32v32 32h-32-32v32 32h-32-32v-32-32h-32-32v32 32h-32-32v-32-32h-32-32v-32-32h32 32v-32-32h-32-32v-32-32h32 32v-32-32h32 32v32zm0 128v32h32 32v-32-32h-32-32v32z"></path></svg>
                            })                                 
                        }
                    </HStack>
                    <Divider />
                    <CardFooter className="project-card-footer">
                        <ButtonGroup>
                            <Button variant='outline' colorScheme='gray' rightIcon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />} leftIcon={<FontAwesomeIcon icon={faGithubAlt} />} onClick={() => goToExternalLink(project.html_url)} >
                                View on GitHub
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
                );
            })}
        </SimpleGrid>
    );
}

export default ProjectsSection;