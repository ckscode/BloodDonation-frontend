import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Radio } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from '../../ApiCalls/ApiCalls';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../Redux/loaderSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [type, setType] = useState("donor");
    const onFinish = async(values) => {
      try{
        dispatch(setLoading(true));
        const response = await LoginUser({...values,type});
        if(response.status){
          message.success(response.message);
          localStorage.setItem("token",response.data);
          dispatch(setLoading(false));
          navigate('/')
        }else{
          dispatch(setLoading(false));
          throw new Error(response.message)
        }
      }catch(error){
         dispatch(setLoading(false));
           message.error(error.message)
      }
      };

useEffect(()=>{
if(localStorage.getItem("token")){
 navigate('/')
}
},[])

    return (
        <div className="flex justify-center items-center h-screen bg-amber-200">
          <div className='justify-start items-center me-8'>
            <p className='text-2xl w-full'>Give The Gift Of Life</p>
            <h1 className='inline-block text-primary text-5xl blood text-start'>
              Donate Blood.
            </h1>
          </div>
        <Form layout="vertical  flex justify-center"
        onFinish={onFinish}>
          <div className="bg-white shadow-lg rounded-xl p-5 ms-8">
            <h1 className="text-4xl text-primary mb-0 heading">{type}</h1>
            <h2 className="text-gray-900 mb-2">Login</h2>
            <Radio.Group
              className="mb-3"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <Radio value="donor">Donor</Radio>
              <Radio value="hospital">Hospital</Radio>
              <Radio value="organisation">Organisation</Radio>
            </Radio.Group>
            <Form.Item name="email" label="Email" className="mb-2"
                 rules={[
                  {
                    required: true,
                    message:"Email field is empty"
                  },
                ]}>
                  <Input />
                </Form.Item>
  
                <Form.Item name="password" label="Password" className="mb-2"
                 rules={[
                  {
                    required: true,
                    message:"Password field is empty"
                  },
                ]}>
                  <Input type="password" />
                </Form.Item>

            <div className="w-full text-center">
              <Button htmlType='submit' className="bg-primary w-1/2 text-white mt-4 mb-1">
                Login
              </Button>
            </div>
            <p className="text-center mt-1">
              Don't have an Account? 
              <Link className="text-blue-600" to="/register">
                 &nbsp;Register
              </Link>
            </p>
          </div>
        </Form>
      </div>
    );
};

export default Login;