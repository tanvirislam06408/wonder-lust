'use client'
import SocialLogin from "@/components/shared/SocialLogin";
import { authClient } from "@/lib/auth.client";
import {Check} from "@gravity-ui/icons";
import {Button, Description, FieldError, Form, Input, Label, Separator, TextField} from "@heroui/react";
import { redirect } from "next/navigation";
function LoginPage() {

const handleLogin=async(e)=>{
    e.preventDefault();
    const formData=new FormData(e.currentTarget);
    const {password,email,imageUrl,name}=Object.fromEntries(formData.entries());
    
    
    const { data, error } = await authClient.signIn.email({
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
             <Form onSubmit={handleLogin} className="flex  flex-col gap-4">

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
                <div className="flex gap-2">
                    <Button type="submit " className={'w-full'}>
                        <Check />
                        SignIn
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

export default LoginPage;