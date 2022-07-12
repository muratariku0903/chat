import React, { useState } from "react";
import { NextPageWithLayout } from "next";
import { styled } from '@mui/material/styles';
import BaseLayout from "../../components/layout/base";
import { useInquiry } from "../../hooks/inquiry";

const FormWrapper = styled('div')({
    padding: '20px'
});

const Button = styled('button')({
    margin: '20px'
});


type ContactPageProps = {};

const ContactPage: NextPageWithLayout<ContactPageProps> = ({ }) => {
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
                <div>
                    <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="tel" placeholder="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
                </div>
                <div>
                    <select name="" id="" placeholder="productType" value={productTypeId} onChange={(e) => setProductTypeId(e.target.value)}>
                        <option value="dm129qbM9QYUEo3yQ6kv">A001</option>
                        <option value="NMjN6RdlToeg6w1LNJeq">A002</option>
                        <option value="OKYId0COQ0MvkE3sUDLy">A003</option>
                    </select>
                </div>
                <div>
                    <textarea cols={30} rows={40} placeholder="content" value={content} onChange={(e) => setContent(e.target.value)}>
                    </textarea>
                </div>
                <Button onClick={send}>send</Button>
            </form>
        </FormWrapper>
    );
}

ContactPage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;

export default ContactPage;
