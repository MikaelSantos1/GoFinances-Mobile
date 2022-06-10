import React from "react";


import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard ,TransactionCardProps} from "../../components/TransactionCard";

import {
    Container,
    Header,
    UserInfo,
    Photo,
    User,
    UserGreeding,
    UserName,
    UserWrapper,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LoggoutButton
} from "./styles";

export interface DataListProps extends TransactionCardProps{
    id:string;
}

export function Dashboard() {
    const data:DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Desenvolvimento de app",
            amount: "R$6.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date: "23/05/22"
        },
        {
            id: '2',
            type: 'negative',
            title: "Hamburguer",
            amount: "R$50,00",
            category: {
                name: 'Alimentação',
                icon: 'coffee',
            },
            date: "23/05/22"
        },
        {
            id: '3',
            type: 'positive',
            title: "Desenvolvimento de app",
            amount: "R$6.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date: "23/05/22"
        },
        {
            id: '4',
            type: 'negative',
            title: "Aluguel",
            amount: "R$1.200,00",
            category: {
                name: 'Casa',
                icon: 'shopping-bag',
            },
            date: "23/05/22"
        }
    ]

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
                    <LoggoutButton onPress={()=>{}}>
                    <Icon name="power" />
                    </LoggoutButton>
                    
                </UserWrapper>

            </Header>

            <HighlightCards

            >
                <HighlightCard
                    type="up"
                    title="Entradas"
                    amount="R$ 15.000,00"
                    lastTransaction="Ultima entrada 23 de maio"
                />
                <HighlightCard
                    type="down"
                    title="Saidas"
                    amount="R$ 1.000,00"
                    lastTransaction="Ultima saida 23 de maio"
                />

                <HighlightCard
                    type="total"
                    title="Total"
                    amount="R$ 14.000,00"
                    lastTransaction="01 a 23 de maio"
                />
            </HighlightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}

                />



            </Transactions>
        </Container>
    )
}
