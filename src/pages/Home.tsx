import styled from "styled-components";
import { useNavigate } from "react-router";
import { Title, Wrap } from "../components/components.tsx";
import { useForm } from "react-hook-form";

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

type FormValues = {
    username: string;
    password: string;
    name: string;
    email: string;
};

function Home() {
    // 1. 화면에 사용자가 입력해야 할 로그인 폼을 작성하고
    // --- styled-components 의 힘을 빌어 화면 디자인

    // 그에대해 사용가가 입력 처리를 끝내면
    // ---각 input과 state를 작성
    // --- input과 useState 연결
    // --- 사용자가 엔터를 칠 때 또는 회원 가입 버튼ㄴ을 눌렀을 때 onSubmit 작성

    // --- 그에대한 유효성 검사를 한다 -> 사용자를 이동시킴.
    // --- if 처리를 통해 내가 생각한, 전송에서 탈락행랴 할 조건을 작성

    // 단, 유효성 검사에 살패하면 에러 메세지를 출력시키고 끝낸다.
    // --- useState를 또 다시 만들 필요가 있음
    // --- 여러개의 에러를 관리항 useState를 만들어도 되고, 하나의 useState를 사용할 수도 있음

    // --- 하나의useState를 쓴다면ㅡ function 안에서 여러번의 setState 동작되므로
    // --- function 내에서 한 번만 setState 처리를 하기 위헤 새로운 object를 작성하였음.

    const navigate = useNavigate();

    const {
        register, // 화면에 존재하는 input react-hook-form을 연결하는 기능
        handleSubmit, // react-hook-form 에서기재한 유효성 검사를 포함하여 submit 처리를 할 떄 사용하는 기능
        formState: { errors },  // errors : 유효성 검사 결과 값이 저장돠는 곳.
    } = useForm<FormValues>();

    //  예전에  Submit속성에 집어넣었을 따는 (event) => {} 의 함수여야 했는데,
    // react-hook-form을 사용하면서 handleSubmit() 안에 매개변수로 넣어야 하는 함수가 되었기 때문에
    // 그 모양은 data((리액트 폼에 맡겼던 그 타입) => {} 모양이 되어야 함.
    // 즉, 매개변수인 data에는 react-hook-form이 갖고 있는 값들이 객체로 들어옴.
    const onSubmit = (data: FormValues) => {
        // 백엔드에게 전송
        const queryString = new URLSearchParams(data).toString(); // 객체를 쿼리스트링을 만들어서 string으로 형변환
        navigate(`/result?${queryString}`);
    };

    return (
        <Wrap>
            <Card onSubmit={handleSubmit(onSubmit)}>
                <Title>회원가입</Title>
                <InputGroup>
                    <Input
                        placeholder={"아이디"}
                        {...register("username", {
                            required: "아이디는 필수 입력 값입니다.",
                        })}
                    />
                    {/* 아이디에 대해 검사하고, 실패한 내용에대해 출력함.*/}
                    {errors.username && <ErrorText>{errors.username.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"비밀번호"}
                        type={"password"}
                        {...register("password", {
                            required: "비밀번호는 필수 입력 값입니다.",
                            minLength: {
                                value: 6,
                                message: "비밀번호는 최소 6자 이상입니다",
                            },
                        })}
                    />
                    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이름"}
                        {...register("name", {
                            required: "이름은 필수 입력 값입니다.",
                        })}
                    />
                    {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
                </InputGroup>
                <InputGroup>
                    <Input
                        placeholder={"이메일"}
                        type={"email"}
                        {...register("email", {
                            required: "이메일은 필수 입력 값입니다.",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "올바른 이메일 형식이 아닙니다",
                            },
                        })}
                    />
                    {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                </InputGroup>
                <Button type={"submit"}>회원가입</Button>
            </Card>
        </Wrap>
    );
}

export default Home;
