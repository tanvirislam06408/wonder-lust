"use client";

import { authClient } from "@/lib/auth.client";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";

export function DeleteModal({details}) {
    const handleDeleteDestination=async(id)=>{
      const {data:tokenData}=await authClient.token()
        const res=await fetch(`http://localhost:5000/destination/${id}`,
            {
                method:'DELETE',
                headers:{
                    'content-type':'application/json',
                    authorization:`Bearer ${tokenData?.token}`

                }
            }
        )
        const data=await res.json();
        if(data.acknowledged){
            redirect('/destination')
        }
        

    }
  return (
    <AlertDialog>
      <Button variant="danger">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Destination permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{details?.destinationName}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={()=>handleDeleteDestination(details._id)} slot="close" variant="danger">
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}