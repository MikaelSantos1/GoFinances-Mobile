import React,{useState} from "react";
import { Button } from "../../components/Forms/Button";
import { CategorySelect } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input/input";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from "./styles";

export function Register() {
    const [transactionType,setTransactionType]=useState('')

    function handleTransactionTypeSelect(type:'up'|'down'){
        setTransactionType(type)
    }
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />

                    <Input
                        placeholder="Preço"
                    />
                    <TransactionTypes>
                        <TransactionTypeButton
                            title="income"
                            type="up" 
                            onPress={()=>handleTransactionTypeSelect('up')}
                            isActive={transactionType==='up'}
                            />

                        <TransactionTypeButton
                            title="outcome"
                            type="down" 
                            
                            onPress={()=>handleTransactionTypeSelect('down')}
                            isActive={transactionType==='down'}
                            />
                    </TransactionTypes>
                    <CategorySelect title="Categôria"/>
                </Fields>
                <Button title="Enviar" />
            </Form>

        </Container>
    )
}