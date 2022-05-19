import React from "react";

import { Container,
        Header,
        Title,
        Icon,
        Amount,
        Footer,
        LastTransaction,

} from "./styles";
export function HighlightCard(){
    return(
        <Container>
            <Header>
                <Title>Entrada</Title>
                <Icon name="arrow-up-circle"/>
            </Header>

            <Footer>
                <Amount>R$ 19.000,00</Amount>
                <LastTransaction>Última entrada dia 17 de abril</LastTransaction>
            </Footer>
        </Container>
    )
}