import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import {Layout, Menu } from 'antd';
import {EditOutlined, EyeOutlined, SearchOutlined,
        VideoCameraOutlined, HomeOutlined, MailOutlined} from '@ant-design/icons';
import Create from "./components/create";
import View from "./components/view";
import HomePage from "./components/Home";
import Discover from "./components/discover";
import ReviewPage from "./components/reviewPage";
import FindMovies from "./components/movies";
import Feedback from "./components/feedback";

const { Header, Content, Footer } = Layout;

const items = [
    {
        label: (<NavLink className="nav-link" to="/"> Home </NavLink>),
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: (<NavLink className="nav-link" to="/create"> Create </NavLink>),
        key: "create",
        icon: <EditOutlined />,
    },
    {
        label: (<NavLink className="nav-link" to="/view"> View </NavLink>),
        key: "view",
        icon: <EyeOutlined />,
    },
    {
        label: (<NavLink className="nav-link" to="/discover"> Discover </NavLink>),
        key: "discover",
        icon: <SearchOutlined />,
    },
    {
        label: (<NavLink className="nav-link" to="/movies"> Find Movies </NavLink>),
        key: "movies",
        icon: <VideoCameraOutlined />,
    },
    {
        label: (<NavLink className="nav-link" to="/feedback"> Feedback </NavLink>),
        key: "feedback",
        icon: <MailOutlined />,
    },
];


export default function App() {
    const [currPage, setCurrPage] = useState("create");
    const switchPage = e => {
        // debugging
        //console.log('click ', e);
        setCurrPage(e.key);
    }
    return(
        <Layout style={{ backgroundColor: '#e6f4ff' }}>
            <Header>
                <Menu 
                onClick={switchPage} 
                selectedKeys={[currPage]} 
                mode="horizontal" 
                items={items} 
            theme="dark"/>
            </Header>
            <Content>
                <Routes>
                    <Route exact path='/' element={<HomePage setCurrPage={setCurrPage}/>}/>
                    <Route path="/view" element={<View setCurrPage={setCurrPage}/>}/>
                    <Route path="/review/:id" element={<ReviewPage/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/discover" element={<Discover setCurrPage={setCurrPage}/>}/>
                    <Route path="/movies" element={<FindMovies setCurrPage={setCurrPage}/>}/>
                    <Route path="/feedback" element={<Feedback setCurrPage={setCurrPage}/>}/>
                </Routes>
            </Content>
        </Layout>
    );
}