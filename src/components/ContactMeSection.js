import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import useSubmit from "../hooks/useSubmit.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useAlertContext } from "../context/alertContext.js";
import "../stylesheets/ContactMeSection.css";

const ContactMeSection = (props) => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen, onClose } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "",
      type: "collaborate",
      comment: ""
    },
    onSubmit: (values) => {
        props.onSubmit ? props.onSubmit(values) : submit(values);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().matches(/^[a-zA-Z ]*$/,"Must contain only alphabets").required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      type: Yup.string().oneOf(['collaborate','hire','feedback','other'], "Invalid type of enquiry"),
      comment: Yup.string().trim().min(25,"Must be at least 25 characters").required("Required")
    }),
  });

  useEffect(()=>{
    if(response){
      if(response.type=='success'){
        formik.resetForm();
      }
      onOpen(response.type, response.message);
      setTimeout(()=>{
        onClose();
      },3000);
    }
  }, [response]);

  return (
      <VStack className="contact-container">
        <Box rounded="md" className="contact-form-container">
          <form onSubmit={
            formik.handleSubmit
          }>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName" 
                  {...formik.getFieldProps('firstName')}
                />
                <FormErrorMessage>
                  {formik.errors.firstName} 
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                <FormErrorMessage>
                  {formik.errors.email} 
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Nature of Enquiry</FormLabel>
                <Select id="type" name="type"
                  {...formik.getFieldProps("type")}>
                  <option style={{color: "black"}} value="collaborate">Call for Collaboration</option>
                  <option style={{color: "black"}} value="hire">Career Opportunity</option>
                  <option style={{color: "black"}} value="feedback">Feedback</option>
                  <option style={{color: "black"}} value="other">Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.touched.comment && formik.errors.comment}>
                <FormLabel htmlFor="comment">Your Message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                <FormErrorMessage>
                  {formik.errors.comment}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="blue" width="full" isLoading={isLoading} loadingText='Submitting' spinnerPlacement='end' rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
  );
};

export default ContactMeSection;
