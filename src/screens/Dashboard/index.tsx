import React, { useEffect, useState } from "react";


import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([])

    async function loadTransaction() {
        const dataKey = '@GoFinance:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response) : [];
      
        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {
            const amount = Number(item.amount)
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }
            
        })
       console.log(transactionsFormatted)
        setData(transactionsFormatted)
    }

    useEffect(() => {
        loadTransaction()
        // const dataKey = '@GoFinance:transactions'
        // AsyncStorage.removeItem(dataKey)
    }, [])
    console.log(data)
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
                    <LoggoutButton onPress={() => { }}>
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
