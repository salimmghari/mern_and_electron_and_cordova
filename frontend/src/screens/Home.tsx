import React, {
    useState,
    useEffect,
    useCallback
} from 'react';
import {
    useAppDispatch, 
    useAppSelector
} from '../redux/app/hooks';
import {useNavigate} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import anime from 'animejs';
import 'chart.js/auto';
import {Chart} from 'react-chartjs-2';
import {logout as logoutAction} from '../redux/features/user/userSlice';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Button from '../components/Button';
import Note, {NoteInterface} from '../components/Note';
import config from '../config.json';


interface HomeProps {
    children?: any;
}


const Home = (props: HomeProps): JSX.Element => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const token: string = useAppSelector((state) => state.user.token);

    const [notes, setNotes] = useState<NoteInterface[]>([]);
    const [newNoteTitle, setNewNoteTitle] = useState<string>('');
    const [newNoteBody, setNewNoteBody] = useState<string>('');

    const readNotes = useCallback(() => {
        if (token !== '') {
            axios.get(`${config.url}/api/notes`, {
                headers: {
                    'Authorization': token
                }
            }).then((response: AxiosResponse<any, any>) => setNotes(response.data))
                .catch((error: any) => console.error(error));        
        }
    }, [token]);

    const createNote = (): void => {
        if (
            newNoteTitle !== ''
            && newNoteBody !== ''
        ) {
            axios.post(`${config.url}/api/notes`, {
                title: newNoteTitle,
                body: newNoteBody
            }, {
                headers: {
                    'Authorization': token
                }
            }).then((response: AxiosResponse<any, any>) => {
                setNewNoteTitle('');
                setNewNoteBody('');
                readNotes()
            }).catch((error: any) => console.error(error));    
        }
    }

    const updateNote = (note: NoteInterface): void => {
        if (
            note.title !== ''
            && note.body !== ''
        ) {
            axios.put(`${config.url}/api/notes/${note._id}`, {
                title: note.title,
                body: note.body
            }, {
                headers: {
                    'Authorization': token
                }
            }).then((response: AxiosResponse<any, any>) => readNotes())
                .catch((error: any) => console.error(error));        
        }
    }

    const deleteNote = (id: string): void => {
        axios.delete(`${config.url}/api/notes/${id}`, {
            headers: {
                'Authorization': token
            }
        }).then((response: AxiosResponse<any, any>) => readNotes())
            .catch((error: any) => console.error(error));    
    }

    const logout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        axios.post(
            `${config.url}/api/users/logout`,
            {},
            {
                headers: {
                    'Authorization': token
                }
            }
        ).then((response: AxiosResponse<any, any>) => {
            localStorage.removeItem('token');
            dispatch(logoutAction());
            navigate('/auth');
        }).catch((error: any) => console.error(error));    
    }

    useEffect(() => {
        if (token === '') {
            navigate('/auth');
        } else {
            readNotes();
            const animation = anime(
                {
                    targets: '#new-note',
                    width: [
                        '0%',
                        '100%'
                    ],
                    opacity: [
                        0, 
                        1
                    ],
                    duration: 2000,
                    delay: 500,
                    easing: 'easeInOutQuad'
                }
            );
            animation.play();
        }
    }, [
        dispatch, 
        navigate, 
        readNotes,
        token
    ]);

    return (
        <Layout>
            <Title>
                Notes
            </Title>
            {notes.map((note: NoteInterface, index: number) => (
                <Note
                    key={note._id}
                    title={note.title}
                    body={note.body}
                    onTitleChange={(event: React.ChangeEvent<HTMLInputElement>) => note.title = event.target.value}
                    onBodyChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => note.body = event.target.value}
                    update={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => updateNote(note)}
                    delete={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => deleteNote(note._id)}
                />
            ))}
            <Note
                id="new-note"
                title={newNoteTitle}
                body={newNoteBody}
                onTitleChange={(event: React.ChangeEvent<HTMLInputElement>) => setNewNoteTitle(event.target.value)}
                onBodyChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNewNoteBody(event.target.value)}
                create={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => createNote()}
            />
            <Chart 
                className="w-full mb-8"
                type="bar"
                data={
                    {
                        labels: [
                            'Notes',
                        ],
                        datasets: [
                            {
                                label: 'Number of Notes',
                                backgroundColor: '#ffffff',
                                borderColor: '#363636',
                                borderWidth: 3,
                                data: [
                                    notes.length 
                                ]
                            }
                        ]
                    }
                }
            />
            <Button 
                className="secondary-color danger-bg-color"
                onClick={logout}
            >
                Logout
            </Button>
        </Layout>
    );
}


export default Home;
