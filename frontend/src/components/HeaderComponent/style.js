import styled from"styled-components";
import {Row} from "antd";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(26, 146,255);
    align-items:center;
    gap:16px;
    flex-gap: nowrap;
`
export const WrapperTextHeader = styled.span`
    front-size:18px;
    color:#fff;
    front-weight:bold;
    text-align: left;
`
export const WrapperHeaderAccout = styled.div`
    display:flex;
    align-items:center;
    color:#fff;
    gap: 10px;
`
export const WrapperTextHeaderSmall = styled.span`
    font-size:12px;
    color: #fff; 
    white-space: nowrap;
`

    
