import React, { useState } from "react";
import { Keyboard, Modal,Alert } from "react-native";

import { Button } from "../../components/Forms/Button";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TouchableWithoutFeedback } from "react-native";

import { useForm } from "react-hook-form";
import { InputForm } from "../../components/Forms/InputForm";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import * as Yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'


import { CategorySelect } from "../CategorySelect";
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from "./styles";

interface FormData {
    [name: string]: string;
}

const schema = Yup.object().shape({
    name:Yup.string().required('Nome é obrigatório'),
    amount:Yup
    .number()
    .required('O valor é obrigatório')
    .typeError('Informe um numero')
    .positive('O valor precisa ser positivo')
})

export function Register() {

    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const {
        control,
        handleSubmit,
        formState:{ errors }

    } = useForm({
        resolver:yupResolver(schema)
    })

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }
    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }
    function handleRegister(form: FormData) {
        if(!transactionType) 
        return Alert.alert('Selecione o tipo da transação!')

        if(category.key === 'category')
        return  Alert.alert('Selecione a categoria!')

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }
        console.log(data)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>
                            <TransactionTypeButton
                                title="income"
                                type="up"
                                onPress={() => handleTransactionTypeSelect('up')}
                                isActive={transactionType === 'up'}
                            />

                            <TransactionTypeButton
                                title="outcome"
                                type="down"

                                onPress={() => handleTransactionTypeSelect('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>
                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}