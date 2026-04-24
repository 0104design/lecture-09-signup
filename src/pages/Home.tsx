import styled from "styled-components";
import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { Title, Wrap } from "../components/components.tsx";


const Card = styled.form`
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



const Input = styled.input`
    padding: 14px;
    border-radius: 10px;
    border: 1px solid #ddd;
    transition: all 0.5s;

    &:focus {
        outline: none;
        border: 1px solid #6c5ce7;
    }
`;

const Button = styled.button`
    padding: 14px;
    background-color: #586cbb;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 20px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const ErrorText = styled.span`
    color: #d63031;
    font-size: 12px;
    margin-top: 4px;
`;

type ErrorType = {
    // 프로퍼타가 몇 개가 될 지 모르겠지만, 그 프로퍼티의 keu는 string일 거고,  그 프로파티의 값들 모두 다 string이다.
    [key: string]: string;
};

function Home() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const [error, setError] = useState<ErrorType>({});

    const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        //1. 기존 form 태그의 onSubmit 기능 무효화
        event.preventDefault();

        //2.  유효성 검사
        const result = validate();      // 유효성 검사에 성공하면 true, 실패하면 false
        if (!result) return;

        // 백엔드에게 전송
        const  data = { username, password, email, name };
        const queryString = new URLSearchParams(data).toString()     // 객체를 쿼리스트링을 만들어서 string으로 형변환
        navigate(`/result?${queryString}`);
    };

    const validate = () => {
        const newErrors: ErrorType = {};
        // 전송하기 전, 유효성 검사를 진행 -> 사용자를 이동
        //1. username이 올바른가?
        if (!username.trim()) newErrors.username = " 아이디는 필수 항목입니다.";
        //2. 비밀번호는 입략이 되었느가?        if (!password.trim()) setError({ password: "비밀번호는 필수 항목입니다" });
        if(!password.trim()) newErrors.password ="비밀번호는 필수항목입니다"
        else if (password.length < 6) newErrors.password = "비밀번호는 최소 6자 이상이여야 합니다.";
        //3. 이름이 없다면?
        if (!name.trim()) newErrors.name = "이름은 필수 항목 입니다";
        //4. 닌네임이 입력?
        if (!email.trim()) newErrors.email = "이메일은 필수 항목입니다";
        else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email))
            newErrors.eamil = "이메일이 올바른 형식으로 입력되지 않았습니다";
        // 이메일은 중간에 @가 들어갔는지, .있는지 확인 => 규칙성을 갖고 있는 string에 대한 검증을할 때는 정규식 사용

        setError(newErrors);
        //true, false로 검증이 실패했는지 성공했는디 반환
        // error이라는 항목에 항목이 있으면 실패
        // Object.keys(객체) => 매개변수로 넣은객체의 프로퍼티 key부분을 뽑아내는 메서드, 반환값[] (array)
        // 집어넣는 객체가 {username: "실패"} 라면, Object,Keys(객체) 의 반환값은 ["username"]
        return Object.keys(newErrors).length === 0;
    };

    return (
        <Wrap>
            <Card onSubmit={onSubmit}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        onChange={event => {
                            setUsername(event.target.value);
                        }}
                    />
                    {/* 아이디에 대해 검사하고, 실패한 내용에대해 출력함.*/}
                    {error.username && <ErrorText>{error.username}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type={"password"}
                        onChange={event => {
                            setPassword(event.target.value);
                        }}
                    />
                    {error.password && <ErrorText>{error.password}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름"}
                        onChange={event => {
                            setName(event.target.value);
                        }}
                    />
                    {error.name && <ErrorText>{error.name}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type={"email"}
                        onChange={event => {
                            setEmail(event.target.value);
                        }}
                    />
                    {error.email && <ErrorText>{error.email}</ErrorText>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;
