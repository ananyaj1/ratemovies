import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import {Layout, Menu } from 'antd';
import {EditOutlined, EyeOutlined, SearchOutlined, VideoCameraOutlined} from '@ant-design/icons';
import Create from "./components/create";
import View from "./components/view";
import Discover from "./components/discover";
import ReviewPage from "./components/reviewPage";
import FindMovies from "./components/movies";

const { Header, Content } = Layout;

const items = [
    {
        label: (<NavLink className="nav-link" to="/create"> Create </NavLink>),
        key: "create",
        icon: <EditOutlined />,
    },
    {
        label: (<NavLink className="nav-link" to="/"> View </NavLink>),
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
];


export default function App() {
    const [currPage, setCurrPage] = useState("create");
    const switchPage = e => {
        // debugging
        //console.log('click ', e);
        setCurrPage(e.key);
    }
    return(
        <Layout>
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
                    <Route exact path="/" element={<View/>}/>
                    <Route path="/review/:id" element={<ReviewPage/>}/>
                    <Route path="/create" element={<Create/>}/>
                    <Route path="/discover" element={<Discover/>}/>
                    <Route path="/movies" element={<FindMovies/>}/>
                </Routes>
            </Content>
        </Layout>
    );
}