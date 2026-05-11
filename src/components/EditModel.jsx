"use client";
import { Envelope } from "@gravity-ui/icons";
import { Button, FieldError, Input, Label, ListBox, Modal, Surface, TextField, Select } from "@heroui/react";


const EditModel = () => {
    const onSubmit= async(e)=>{
        e.preventDefault();
        const formData= new FormData(e.currentTarget);
        const destinationInfo=Object.fromEntries(formData.entries());
        
        const res = await fetch(`http://localhost:5000/destinations`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(destinationInfo)
        })
        const data=await res.json();
        console.log(data);
        
         
    }
    return (
        <Modal>
            <Button size='sm' variant='outline'>Edit</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Edit Destination</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit}
                                                className="p-5 md:p-0 space-y-8 "
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    {/* Destination Name */}
                                                    <div className="md:col-span-2">
                                                        <TextField name="destinationName" isRequired>
                                                            <Label>Destination Name</Label>
                                                            <Input placeholder="Bali Paradise" className="rounded-2xl" />
                                                            <FieldError />
                                                        </TextField>
                                                    </div>
                                
                                                    {/* Country */}
                                                    <TextField name="country" isRequired>
                                                        <Label>Country</Label>
                                                        <Input placeholder="Indonesia" className="rounded-2xl" />
                                                        <FieldError />
                                                    </TextField>
                                
                                                    {/* Category - Updated Select Component */}
                                                    <div>
                                                        <Select
                                                            name="category"
                                                            isRequired
                                                            className="w-full"
                                                            placeholder="Select category"
                                                        >
                                                            <Label>Category</Label>
                                                            <Select.Trigger className="rounded-2xl">
                                                                <Select.Value />
                                                                <Select.Indicator />
                                                            </Select.Trigger>
                                                            <Select.Popover>
                                                                <ListBox>
                                                                    <ListBox.Item id="Beach" textValue="Beach">
                                                                        Beach
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                    <ListBox.Item id="Mountain" textValue="Mountain">
                                                                        Mountain
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                    <ListBox.Item id="City" textValue="City">
                                                                        City
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                    <ListBox.Item id="Adventure" textValue="Adventure">
                                                                        Adventure
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                    <ListBox.Item id="Cultural" textValue="Cultural">
                                                                        Cultural
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                    <ListBox.Item id="Luxury" textValue="Luxury">
                                                                        Luxury
                                                                        <ListBox.ItemIndicator />
                                                                    </ListBox.Item>
                                                                </ListBox>
                                                            </Select.Popover>
                                                        </Select>
                                                    </div>
                                
                                                    {/* Price */}
                                                    <TextField name="price" type="number" isRequired>
                                                        <Label>Price (USD)</Label>
                                                        <Input
                                                            type="number"
                                                            placeholder="1299"
                                                            className="rounded-2xl"
                                                        />
                                                        <FieldError />
                                                    </TextField>
                                
                                                    {/* Duration */}
                                                    <TextField name="duration" isRequired>
                                                        <Label>Duration</Label>
                                                        <Input
                                                            placeholder="7 Days / 6 Nights"
                                                            className="rounded-2xl"
                                                        />
                                                        <FieldError />
                                                    </TextField>
                                
                                                    {/* Departure Date */}
                                                    <div className="md:col-span-2">
                                                        <TextField name="departureDate" type="date" isRequired>
                                                            <Label>Departure Date</Label>
                                                            <Input type="date" className="rounded-2xl" />
                                                            <FieldError />
                                                        </TextField>
                                                    </div>
                                
                                                    {/* Image URL - Removed preview */}
                                                    <div className="md:col-span-2">
                                                        <TextField name="image" isRequired>
                                                            <Label>Image URL</Label>
                                                            <Input
                                                                type="url"
                                                                placeholder="https://example.com/bali-paradise.jpg"
                                                                className="rounded-2xl"
                                                            />
                                                            <FieldError />
                                                        </TextField>
                                                    </div>
                                
                                                    {/* Description */}
                                                    <div className="md:col-span-2">
                                                        <TextField name="description" isRequired>
                                                            <Label>Description</Label>
                                                            <TextArea
                                                                placeholder="Describe the travel experience..."
                                                                className="rounded-3xl"
                                                            />
                                                            <FieldError />
                                                        </TextField>
                                                    </div>
                                                </div>
                                
                                                {/* Buttons */}
                                
                                                <Button
                                                    type="submit"
                                                    variant="outline"
                                                   
                                                    className=" rounded-none w-full bg-cyan-500 text-white"
                                                >
                                                    {/* {isPending ? "Adding Package..." : "Add Travel Package"} */}
                                                    Submit
                                                </Button>
                                            </form>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancel
                            </Button>
                            <Button slot="close">Send Message</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditModel;