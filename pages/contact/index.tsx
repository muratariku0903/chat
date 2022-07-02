import React, { useState } from "react";
import { NextPage } from "next";
import { styled } from '@mui/material/styles';
import { useInquiry } from "../../hooks/inquiry";

const FormWrapper = styled('div')({
    padding: '20px'
});

const Button = styled('button')({
    margin: '20px'
});


type ContactPageProps = {};

const ContactPage: NextPage<ContactPageProps> = ({ }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [productTypeId, setProductTypeId] = useState('dm129qbM9QYUEo3yQ6kv');
    const { addInquiry } = useInquiry();

    const send = async () => {
        await addInquiry({
            customerName: name,
            customerEmail: email,
            customerTel: tel,
            title: title,
            content: content,
            productTypeId: productTypeId,
        });
    }

    return (
        <FormWrapper>
            <h2>お問い合わせフォーム</h2>
            <form>
                <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} /> <br />
                <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} /> <br />
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type="tel" placeholder="tel" value={tel} onChange={(e) => setTel(e.target.value)} /> <br />
                <select name="" id="" placeholder="productType" value={productTypeId} onChange={(e) => setProductTypeId(e.target.value)}> <br />
                    <option value="dm129qbM9QYUEo3yQ6kv">A001</option>
                    <option value="NMjN6RdlToeg6w1LNJeq">A002</option>
                    <option value="OKYId0COQ0MvkE3sUDLy">A003</option>
                </select><br />
                <textarea cols={30} rows={40} placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}>
                </textarea>
                <Button onClick={send}>send</Button>
            </form>
        </FormWrapper>
    );
}

export default ContactPage;
