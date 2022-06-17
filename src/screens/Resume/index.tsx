import React, { useCallback, useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from "victory-native";
import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadContainer
} from "./styles";
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import {useTheme } from 'styled-components'
import { useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import {addMonths, subMonths, format} from 'date-fns'
import {ptBR} from  'date-fns/locale'
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";
interface TransactionData {

    type: 'positive' | 'negative'
    name: string;
    amount: string;
    category: string;
    date: string;
}
interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormated: string;
    color: string;
    percent:string;
}

export function Resume() {
    const [isLoading,setIsLoading]= useState(false)
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
    const [selectDate,setSelectDate] = useState(new Date())
    const {user}= useAuth()
    const theme = useTheme()

    function handleDateChange(action:'next'|'prev'){
        
        if(action==='next'){
            setSelectDate(addMonths(selectDate,1))
        }else{
            setSelectDate(subMonths(selectDate,1))
        }
    }

    async function LoadData() {
        setIsLoading(true)
        const dataKey = `@GoFinance:transactions_user:${user.id}`
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormated = response ? JSON.parse(response) : []

        const expensives = responseFormated
            .filter((expensive: TransactionData) => 
            expensive.type === 'negative' &&
            new Date(expensive.date).getMonth()===selectDate.getMonth() &&
            new Date(expensive.date).getFullYear()===selectDate.getFullYear()    
            )
    
        const expensiveTotal= expensives
        .reduce((accumulator:number,expensive:TransactionData)=>{
            return accumulator + Number(expensive.amount)
        },0)
        

        const totalByCategory: CategoryData[] = []
        categories.forEach(category => {
            let categorySum = 0;
            
            expensives.forEach((expensive: TransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })
            
            if (categorySum > 0) {
                const totalFormated = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                const percent = `${(categorySum / expensiveTotal * 100).toFixed(0)} %`

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormated,
                    percent
                })
            }

        })
        setTotalByCategories(totalByCategory)
        setIsLoading(false)
    }
 
    
    useFocusEffect(useCallback(() => {
        LoadData()
    }, [selectDate]))

    return (
        <Container>
            <Header>
                <Title>Resumo</Title>
            </Header>
            {
                 isLoading ?
                 <LoadContainer>
                     <ActivityIndicator color={theme.colors.primary} size="large" />
                 </LoadContainer>
                  
                
                

           : <Content 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal:24,
                paddingBottom:useBottomTabBarHeight()
            }}
            >
                <MonthSelect>
                    <MonthSelectButton onPress={()=>handleDateChange('prev')}>
                        <MonthSelectIcon name="chevron-left"/>
                    </MonthSelectButton>

                    <Month>{format(selectDate, 'MMMM , yyyy',{
                        locale:ptBR
                    })}</Month>

                    <MonthSelectButton onPress={()=>handleDateChange('next')}>
                        <MonthSelectIcon name="chevron-right"/>
                    </MonthSelectButton>
                </MonthSelect>

                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        x="percent"
                        y="total"
                        colorScale={totalByCategories.map(category=>category.color)}
                        labelRadius={50}
                        style={{
                            labels:{
                                fontSize:RFValue(18),
                                fontWeight:'bold',
                                fill:theme.colors.shape
                            },
                        }}
                    />
                </ChartContainer>
                {
                    totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.totalFormated}
                            color={item.color}
                        />
                    ))
                }
            </Content>
            
            }
        </Container>
    )
}