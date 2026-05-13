import { authClient } from '@/lib/auth.client';
import { Button } from '@heroui/react';
import {Icon} from "@iconify/react";

const SocialLogin = () => {
    const handleGithubSignUp=async()=>{
            const data = await authClient.signIn.social({
        provider: "github"
    })
    console.log(data);
    
    }
    return (
        
            <Button onClick={handleGithubSignUp} className="w-full border" variant="outline ">
                <Icon icon="mdi:github" />
                Sign in with GitHub
            </Button>
    );
};

export default SocialLogin;