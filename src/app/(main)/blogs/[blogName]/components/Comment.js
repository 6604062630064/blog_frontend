import moment from "moment";
import styled from "styled-components";
import { useContext } from "react";
import { Context } from "@/components/Context";
const Wrapper = styled.div`
	padding-top: 15px;
	display: flex;
	flex-direction: column;
	padding-bottom: 15px;
	border-bottom: 1px solid grey;
`;

const Header = styled.div`
	display: flex;
	gap: 15px;
	align-items: center;
	a {
		color: red;
		cursor: pointer;
	}
`;

const Username = styled.div`
	font-weight: 600;
`;

const Time = styled.div`
	font-size: 1rem;
	font-weight: 300;
`;

const Content = styled.div``;
export default function Comment(props) {
	const [userInfo, setUserInfo] = useContext(Context);
	return (
		<Wrapper>
			<Header>
				<Username>{props.posted_by?.username}</Username>
				<Time>{moment(props.created).fromNow()}</Time>
				{userInfo.role === "admin" ? (
					<a onClick={() => props.onDelete(props._id)}>Remove</a>
				) : (
					<></>
				)}
			</Header>
			<Content>{props.content}</Content>
		</Wrapper>
	);
}
