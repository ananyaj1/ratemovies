import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import {Layout, Menu, Button, Space, Row, Col } from 'antd';
import {EditOutlined, EyeOutlined, SearchOutlined,
        VideoCameraOutlined, HomeOutlined, MailOutlined,
        UserOutlined} from '@ant-design/icons';
import Create from "./components/create";
import View from "./components/view";
import HomePage from "./components/Home";
import Discover from "./components/discover";
import ReviewPage from "./components/reviewPage";
import FindMovies from "./components/movies";
import Feedback from "./components/feedback";
import logo from "./images/rm.png";
import CreateUser from "./components/user/createUser";
import LoginUser from "./components/user/loginUser";
import DeleteUser from "./components/user/deleteUser";
import UserPage from "./components/user/userPage";

const { Header, Content } = Layout;

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currPage, setCurrPage] = useState("create");
    const navigate = useNavigate();

    useEffect(() => {
        if(document.cookie) {
            const token = jwt_decode(document.cookie);
            setLoggedIn(!!token);
            //console.log(token);
        }
        return;
    }, [document.cookie]);

    const switchPage = e => {
        // debugging
        //console.log('click ', e);
        setCurrPage(e.key);
    };

    const handleLogout = () => {
        // Clear the cookie and set loggedIn to false
        var Cookies = document.cookie.split(';');
        // set past expiry to all cookies
        for (var i = 0; i < Cookies.length; i++) {
            document.cookie = Cookies[i] + "=; expires="+ new Date(0).toUTCString();
        }
        setLoggedIn(false);
        // Navigate back to '/'
        navigate('/');
    };
    const items = [
        {
            label: (<NavLink className="nav-link" to="/" onClick={switchPage}> Home </NavLink>),
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: (<NavLink className="nav-link" to="/view" onClick={switchPage}> View </NavLink>),
            key: "view",
            icon: <EyeOutlined />,
        },
        {
            label: (<NavLink className="nav-link" to="/discover" onClick={switchPage}> Discover </NavLink>),
            key: "discover",
            icon: <SearchOutlined />,
        },
        {
            label: (<NavLink className="nav-link" to="/movies" onClick={switchPage}> Find Movies </NavLink>),
            key: "movies",
            icon: <VideoCameraOutlined />,
        },
        {
            label: (<NavLink className="nav-link" to="/feedback" onClick={switchPage}> Feedback </NavLink>),
            key: "feedback",
            icon: <MailOutlined />,
        },
    ];

    if(loggedIn) {
        items.splice(1, 0, {
            label: (<NavLink className="nav-link" to="/create" onClick={switchPage}> Create </NavLink>),
            key: "create",
            icon: <EditOutlined />,
        });
        const token = jwt_decode(document.cookie);
        const userPage = `/user/${token.userId}`
        items.push({
            label: (<NavLink className="nav-link" to={userPage} onClick={switchPage}> My Profile </NavLink>),
            key: "user",
            icon: <UserOutlined/>,
        });
    }

    return(
        <div className="main-page">
            <Row justify="center" align="middle">
                <Col flex="auto">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt="My Logo" style={{ width: '50px', height: '50px' }} />
                    <h1 style={{ color: '#bfbfbf', marginLeft: '10px' }}>RateMovies.</h1>
                </div>
                </Col>
                <Col style={{ padding: '0.5rem 1rem' }}>
                {/* Logout button aligned to the left */}
                {loggedIn ? 
                (
                    <Button type="primary" danger onClick={handleLogout}>
                    Logout
                    </Button>
                ) 
                : (
                    <Space>
                        <Button type="primary" onClick={() => navigate('/user/login')}>
                            Sign In
                        </Button>
                        <Button type="primary" onClick={() => navigate('/user/create')}>
                            Create Account
                        </Button>
                    </Space>
                )
                }
                
                </Col>
            </Row>
            <Layout style={{ backgroundColor: '#e6f4ff' }}>
            <Header>
            <Menu 
                    onClick={switchPage} 
                    selectedKeys={[currPage]} 
                    style={{ display: 'flex', justifyContent: 'center' }}
                    mode="horizontal" 
                    items={items} 
                theme="dark"/>
            </Header>
            <Content>
                <Routes>
                    <Route exact path='/' element={<HomePage/>}/>
                    <Route path="/view" element={<View/>}/>
                    <Route path="/review/:id" element={<ReviewPage />}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/discover" element={<Discover/>}/>
                    <Route path="/movies" element={<FindMovies/>}/>
                    <Route path="/feedback" element={<Feedback />}/>
                    <Route path="/user/create" element={<CreateUser/>}/>
                    <Route path="/user/login" element={<LoginUser setLoggedIn={() => setLoggedIn(true)}/>}/>
                    <Route path="/user/delete" element={<DeleteUser/>}/>
                    <Route path="/user/:id" element={<UserPage/>}/>
                </Routes>
            </Content>
        </Layout>
        </div>
        
    );
}