import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import "../stylesheets/Header.css";


const Header = ({children}) => {
  
  const boxRef = useRef(null);
  const [scrollData, setScrollData] = useState(0);

  const handleScroll = () => {
    if(window.scrollY>scrollData){
      boxRef.current.style.transform="translateY(-200px)";
    }
    else{
      boxRef.current.style.transform="translateY(0)";
    }
    setScrollData(window.scrollY);
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);

    return ()=> window.removeEventListener('scroll', handleScroll);
  },[scrollData]);

  return (
    <HStack
      ref={boxRef}
      className="nav-container"
      >
      <NavLink to='/' className="nav-home"><FontAwesomeIcon size='xl' icon={faHouse} /></NavLink>
      <HStack spacing={10}>
          <NavLink to='/projects' className="nav-right-projects"><b>Projects</b></NavLink>
          <NavLink to='/contact' className="nav-right-contactme"><b>Connect</b></NavLink>
      </HStack>
    </HStack>

  );
};
export default Header;