import React, {useState} from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
    const [action, setAction] = useState("logIn");
    const username = useInput("");
    const email = useInput("");

    const [requestSecret] = useMutation(LOG_IN, {
        variables: { email: email.value },
        update: (_, data) => {
            const { requestSecret } = data.data;
            if(!requestSecret) {
                toast.error("You don't have an account yet, create one");
                setTimeout(() => setAction("SignUp"), 3000);
            }
        }
      });

      const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
          variables: {
              email: email.value,
              username: username.value
          },
          update: (_, data) => {
                const { createAccount } = data.data;
                if(createAccount) {
                    toast.success("Account created! Log in now");
                    setTimeout(() => setAction("logIn"), 3000);
                } else {
                    toast.error("Can't create account");
                }
          }
      });

    const onSubmit = async(e) => {
        e.preventDefault();
        if(action === "logIn") {
            if(email.value !== "") {
                try {
                    await requestSecret();
                }catch (e) {
                    toast.error("Can't request secret, try again");
                }
                
            } else {
                toast.error("Email is required");
            }
        } else if(action === "signUp") {
            if(email.value !== "" && username.value !== "") {
                try {
                    await createAccountMutation();
                } catch(e) {
                    console.log(e);   
                    toast.error("Can't create account, try again");
                }
                
            } else {
                toast.error("All field are required");
            }
        }
    };

    return <AuthPresenter 
        setAction={setAction} 
        action={action} 
        username={username} 
        email={email}
        onSubmit={onSubmit}
        />;
}