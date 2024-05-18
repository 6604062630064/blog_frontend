"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./components/Post";

const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
	font-size: 1.8rem;
	align-self: center;
	color: #6b7280;
	font-style: italic;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 800px;
	margin: 0 auto;
	padding-bottom: 45px;
	border-bottom: 1px solid black;
`;
const BigTitle = styled.h1`
	font-size: 4rem;
	margin-bottom: 10px;
`;
const BlogArea = styled.div`
	margin: 0 auto;
	width: 800px;
`;

export default function Home() {
	const [posts, setPosts] = useState(0);

	useEffect(() => {
		fetch(`${process.env.API_ENDPOINT}posts`)
			.then((res) => res.json())
			.then((data) => {
				setPosts(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	return (
		<Content>
			<Box>
				<BigTitle>Blog</BigTitle>
				<Title>Thoughts, stories and ideas</Title>
			</Box>
			<BlogArea>
				{posts
					? posts.map((member) => <Post {...member} key={member._id} />)
					: ""}
			</BlogArea>
		</Content>
	);
}
