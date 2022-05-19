import React from "react";
import { HighlightCard } from "../../components/HighlightCard";

import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeding,
    UserName,
    UserWrapper,
    Icon
} from "./styles";
export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/90217183?v=4' }} />
                        <User>
                            <UserGreeding>Olá,</UserGreeding>
                            <UserName>Mikael</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>
               
            </Header>

            <HighlightCard/>
        </Container>
    )
}
