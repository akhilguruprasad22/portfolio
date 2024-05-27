import "../stylesheets/LandingSection.css"
import { Avatar, Text, VStack, HStack } from "@chakra-ui/react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import avatarImg from "./../images/linkedIn.webp";
import {
    faGithub,
    faLinkedin,
    faSquareUpwork
  } from "@fortawesome/free-brands-svg-icons";

function LandingSection() {
    const socials = [
        {
            icon: faEnvelope,
            url: "mailto: akhilguruprasad23@gmail.com",
        },
        {
            icon: faGithub,
            url: "https://github.com/akhilguruprasad22",
        },
        {
            icon: faLinkedin,
            url: "https://www.linkedin.com/in/akhil-guruprasad/",
        },
        {
            icon: faSquareUpwork,
            url: "https://www.upwork.com/freelancers/~01aa5bd6451f1e51ba"
        }
    ];


    return (
    <VStack spacing={10} className="section-landing">
        <Text fontSize='5xl' as='b'>I'm Akhil</Text>
        <Avatar name='Akhil G'  size='2xl' src={avatarImg} bg='darkorange' />
        <Text fontSize='3xl'>A <b>Software Developer</b> aiming to achieve mastery over everything the technological world has to offer.</Text>
        <HStack spacing={100} p={10} className="socials-container">
            {socials.map((social,index) => 
            <a key={index} href={social.url} className="socials">
            <FontAwesomeIcon icon={social.icon} size="2x" />
            </a>)}
        </HStack>
    </VStack>
    );
}

export default LandingSection;