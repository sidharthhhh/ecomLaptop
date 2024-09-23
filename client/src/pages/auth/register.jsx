import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '@/store/auth-slice'; 
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName:'',
  email:'',
  password:''
}

function AuthRegister() {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  function onSubmit(e) {
    e.preventDefault();
    console.log('Form Data (direct):', formData);
    
    dispatch(registerUser(formData))
      .then((data) => {
        console.log('Registration Result:', data);
        
        if (data.payload) {
          console.log('Payload structure:', Object.keys(data.payload));
          
          if (data.payload.success) {
            console.log('Registration successful');
            toast({
              title: 'Registration successful',
              description: 'You have successfully registered. Please login.',
            });
            navigate('/auth/login');
          } else if (data.payload.message) {
            console.log('Registration message:', data.payload.message);
            // Here you might want to show this message to the user
          } else {
            console.log('Unexpected payload structure');
          }
        } else {
          console.log('Payload is undefined');
        }

        if (data.error) {
          console.error('Error in response:', data.error);
          // Here you might want to show an error message to the user
        }
      })
      .catch((error) => {
        console.error('Registration Error:', error);
        // Here you might want to show a generic error message to the user
      });
  }


  // console.log("hello")
  return <div className="mx-auto w-full max-w-md space-y-6">
    <div className="text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">create new account</h1>
      <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
    </div>
    <CommonForm
        formControls = {registerFormControls}
        buttonText={'Sign up'}
        formData = {formData}
        setFormData={setFormData}
        onSubmit={onSubmit}  // Changed 'OnSubmit' to 'onSubmit'
    />
  </div>;
}

export default AuthRegister;
