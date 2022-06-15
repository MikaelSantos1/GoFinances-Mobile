import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from '@react-navigation/native'
import { ActivityIndicator } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "styled-components/native";
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
    LoggoutButton,
    LoadContainer
} from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string;
}
interface HighlightProps {
    amount: string;
    lastTransaction:string;
}

interface HighlightData {
    entries: HighlightProps
    expensives: HighlightProps
    total: HighlightProps;
}

export function Dashboard() {

    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTrasanctions] = useState<DataListProps[]>([])
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

    const theme = useTheme()

    function getLastTransactionsData(
        collection:DataListProps[],
        type: 'positive' | 'negative'
        ){
        const lastTransactions = Math.max.apply(Math, collection
            .filter((transaction) => transaction.type === type)
            .map((transaction) => new Date(transaction.date).getTime()))

        return Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',
           
        }).format(new Date(lastTransactions))
    }




    async function loadTransaction() {
        const dataKey = '@GoFinance:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0
        let expensiveTotal = 0

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            if (item.type === 'positive') {
                entriesTotal += Number(item.amount)
            } else {
                expensiveTotal += Number(item.amount)
            }

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

        setTrasanctions(transactionsFormatted)

        const lastTransactionsEntries = getLastTransactionsData(transactions,'positive')
        const lastTransactionsExpensives = getLastTransactionsData(transactions,'negative')
        const totalInterval= `1 a ${lastTransactionsExpensives}`
        console.log(lastTransactionsEntries)
        console.log(lastTransactionsExpensives)

        const total = entriesTotal - expensiveTotal


        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:`Última entrada dia ${lastTransactionsEntries}`
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:`Última entrada dia ${lastTransactionsExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction:totalInterval
            }
        })
        setIsLoading(false)
    }

    useEffect(() => {
        loadTransaction()
        // const dataKey = '@GoFinance:transactions'
        // AsyncStorage.removeItem(dataKey)
    }, [])
    useFocusEffect(useCallback(() => {
        loadTransaction()
    }, []))
    return (
        <Container>

            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator color={theme.colors.primary} size="large" />
                    </LoadContainer>


                    : <>
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
                                amount={highlightData.entries.amount}
                                lastTransaction={highlightData.entries.lastTransaction}
                            />
                            <HighlightCard
                                type="down"
                                title="Saidas"
                                amount={highlightData.expensives.amount}
                                lastTransaction={highlightData.expensives.lastTransaction}
                            />

                            <HighlightCard
                                type="total"
                                title="Total"
                                amount={highlightData.total.amount}
                                lastTransaction={highlightData.total.lastTransaction}
                            />
                        </HighlightCards>

                        <Transactions>
                            <Title>Listagem</Title>
                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}

                            />



                        </Transactions>
                    </>
            }
        </Container>
    )
}
