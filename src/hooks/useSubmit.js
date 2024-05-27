import {useState} from "react";
import emailjs from '@emailjs/browser';

const useSubmit = () => {
  const [isLoading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const submit = (data) => {
    setLoading(true);

    emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, data)
            .then((response) => {
              setResponse({
                type: 'success',
                message: `Thank you for your submission ${data.firstName}, we will get back to you shortly!`,
              });
            })
            .catch((error)=>{
              setResponse({
                type: 'error',
                message: 'Something isn\'t right, please try again later!',
              });
            })
            .finally(() => {
              setLoading(false);
            });
  };

  return { isLoading, response, submit };
}

export default useSubmit;
