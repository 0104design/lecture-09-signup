
import styled from "styled-components";
import { useSearchParams } from "react-router";
import { Title, Wrap } from "../components/components.tsx";

const Card = styled.div`
    background-color: #fff;
    padding: 40px;
    border-radius: 16px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Section = styled.section`
    margin-top: 20px;
`;

const SectionTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
    border-left: 4px solid #4f4be5;
    padding-left: 10px;
`;

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ececec;
`;

const Label = styled.span`
    font-weight: 600;
    color: #555;
`;

const Value = styled.span`
    color: #222;
`;

function Result() {
    const [searchParams] = useSearchParams();
    const username = searchParams.get("username");
    const password = searchParams.get("password");
    const name = searchParams.get("name");
    const email = searchParams.get("email");

    return (
        <Wrap>
            <Card>
                <Title>회원 가입 결과</Title>
                <Section>
                    <SectionTitle>쿼리스트링 결과</SectionTitle>

                    <Item>
                        <Label>사용자 이름 :</Label>
                        <Value>{username}</Value>
                    </Item>
                    <Item>
                        <Label>사용자 이름 :</Label>
                        <Value>{name}</Value>
                    </Item>
                    <Item>
                        <Label>비밀번호 :</Label>
                        <Value>{password}</Value>
                    </Item>
                    <Item>
                        <Label>이메일 :</Label>
                        <Value>{email}</Value>
                    </Item>
                </Section>
            </Card>
        </Wrap>
    );
}

export default Result;
