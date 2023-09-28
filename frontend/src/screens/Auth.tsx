import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import {useAppDispatch} from '../redux/app/hooks';
import {login as loginAction} from '../redux/features/user/userSlice';
import Layout from '../components/Layout';
import Form from '../components/Form';
import Title from '../components/Title';
import Field from '../components/Field';
import Button from '../components/Button';
import Link from '../components/Link';
import config from '../config.json';


interface AuthProps {
    children?: any;
}


const Auth = (props: AuthProps): JSX.Element => {
    const [type, setType] = useState<string>('login');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [newUsername, setNewUsername] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const login = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (
            username !== ''
            && password !== ''
        ) {
            axios.post(
                `${config.url}/api/users/login`,
                {
                    username: username,
                    password: password
                }
            ).then((response: AxiosResponse<any, any>) => {
                localStorage.setItem('token', response.data.token);
                dispatch(loginAction(response.data.token));
                navigate('/');
            }).catch((error: any) => console.error(error));    
        }
    }

    const signup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        if (
            newUsername !== ''
            && newPassword !== ''
            && newPassword === confirmNewPassword
        ) {
            axios.post(
                `${config.url}/api/users/signup`,
                {
                    username: newUsername,
                    password: newPassword
                }
            ).then((response: AxiosResponse<any, any>) => {
                localStorage.setItem('token', response.data.token);
                dispatch(loginAction(response.data.token));
                navigate('/');
            }).catch((error: any) => console.error(error));    
        }
    }

    return (
        <Layout className="h-screen overflow-y-scroll">
            {type === 'login' ? (
                <Form key="login">
                    <Title>
                        Login
                    </Title>
                    <Field
                        label="Username:"
                        type="text"
                        placeholder="Your username"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)} 
                    />
                    <Field 
                        label="Password:"
                        type="password"
                        placeholder="Your password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}                     
                    />
                    <Link onClick={(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => setType('signup')}>
                        Signup?
                    </Link>
                    <Button onClick={login}>
                        Login
                    </Button>
                </Form>
            ) : (
                <Form key="signup">
                    <Title>
                        Signup
                    </Title>
                    <Field
                        label="Username:"
                        type="text"
                        placeholder="Your username"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewUsername(event.target.value)} 
                    />
                    <Field 
                        label="Password:"
                        type="password"
                        placeholder="Your password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value)}                     
                    />
                    <Field 
                        label="Confirm Password:"
                        type="password"
                        placeholder="Your confirm password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(event.target.value)}                     
                    />
                    <Link onClick={(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => setType('login')}>
                        Login?
                    </Link>
                    <Button onClick={signup}>
                        Signup
                    </Button>
                </Form>
            )}
        </Layout>
    );
}


export default Auth;
