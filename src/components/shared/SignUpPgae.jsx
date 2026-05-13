'use client'
import { authClient } from "@/lib/auth.client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, Separator, TextField} from "@heroui/react";
import { redirect } from "next/navigation";
import SocialLogin from "./SocialLogin";
function SignUpPgae() {

const handleSignUp=async(e)=>{
    e.preventDefault();
    const formData=new FormData(e.currentTarget);
    const {password,email,imageUrl,name}=Object.fromEntries(formData.entries());
   
    
    const { data, error } = await authClient.signUp.email({
    name,
    email,
    password,
    imageUrl,
    callbackURL: "/",
});
    if(data.user){
        redirect('/')
    }
    
}
    return (
        
           <div className="container mx-auto flex justify-center min-h-[60vh] max-w-96 items-center flex-col space-y-3.5 h-full ">
             <Form onSubmit={handleSignUp} className="flex  flex-col gap-4">
                <TextField
                    
                    name="name"
                    type="text"
                >
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <TextField
                    
                    name="imageUrl"
                    type="url"
                >
                    <Label>Image Url</Label>
                    <Input placeholder="Enter your image url" />
                  
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        <Check />
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>

            or
            <div className="w-full px-5">
                <SocialLogin/>
            </div>
           </div>
    );
}

export default SignUpPgae;