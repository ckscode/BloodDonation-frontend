import { Button } from 'antd';
import React, { useState } from 'react';
import InventoryForm from './InventoryForm';

const Inventory = () => {
    const [open,setOpen] = useState(false)
    return (
        <div>
            <div className='flex justify-end'>
                <Button type='primary' onClick={()=>setOpen(true)}>
                    Add Inventory
                </Button>
            </div>
            <InventoryForm open={open} setOpen={setOpen}/>
        </div>
    );
};

export default Inventory;