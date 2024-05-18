import styled from "styled-components";
import Link from "next/link";
import moment from "moment";
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding-top: 45px;
	padding-bottom: 45px;
	border-bottom: 1px solid black;
`;

const StyledLink = styled(Link)`
	&:link {
		color: inherit;
	}

	&:visited {
		color: inherit;
	}

	text-decoration: none;
`;

const Title = styled.h1`
	font-size: 2.7rem;
`;
const Line = styled.hr`
	border: 0;
	height: 1px;
	background: #333;
	background-image: linear-gradient(to right, #ccc, #333, #ccc);
`;

const AuthorDesc = styled.p`
	color: #999999;
`;

export default function Post(props) {
	const title = props.title;
	const author = props.posted_by.username;
	const date = props.created;
	const body = props.body;

	return (
		<Wrapper>
			<StyledLink href={"blogs/" + title.replace(/ /g, "-")}>
				<Title>{title}</Title>
			</StyledLink>
			<AuthorDesc>{`By ${author} on ${moment(date).fromNow()}`}</AuthorDesc>
			<p>{body}</p>
		</Wrapper>
	);
}
