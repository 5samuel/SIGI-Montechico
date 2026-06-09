import { useState } from "react";
import styled from "styled-components";
import { v } from "../../styles/variables";
 export function Tabs(){
    const [activeTab, setactiveTab] = useState(0)
    const handleClick =(index)=>{
        setactiveTab(index);
    }
    return (
        <Container className="container">
            <ul>
                <li className={activeTab==0 ? "active": ""} onClick={()=>handleClick(0)} >
                    {<v.iconopie/>}
                    Kardex
                </li>

                <li className={activeTab==1 ? "active": ""} onClick={()=>handleClick(1)} >
                    {<v.iconopie/>}
                    Titulo 2
                </li>
                <span className="glider"></span>

                
            </ul>
            <div className="tab-content">
                {activeTab ===0 && <span>Tab1</span>}
                {activeTab ===1 && <span>Tab2</span>}
                {activeTab ===2 && <span>Tab3</span>}
            </div>
        </Container>

    )
 }

 const Container = styled.div`
 position:relative;
 display:flex;
 align-items:center;
 justify-content:center;
 flex-direction:column;
 width:100%;
 border:1px solid #6a6b6c;
 border-radius:15px;
 height:100%;

 
 `