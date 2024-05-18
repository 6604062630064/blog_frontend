"use client";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./components/Comment";
import { Context } from "@/components/Context";
import { useContext } from "react";
const Content = styled.div`
	display: flex;
	flex-direction: column;
`;

const Head = styled.div`
	margin: 0 auto;
	width: 800px;
	margin-bottom: 40px;
`;

const AuthorDesc = styled.div`
	display: block;
	line-height: 23px;
`;
const Title = styled.h1`
	font-size: 2.7rem;
	margin-bottom: 60px;
`;

const AuthorName = styled.h3`
	font-size: 1.1rem;
	color: #444444;
	font-weight: 600;
`;

const Date = styled.p`
	font-size: 1rem;
	font-weight: 400;
`;

const Inner = styled.div`
	background-color: #222426;
	color: white;
	height: 100vh;
`;

const InnerInner = styled.div`
	margin: 0 auto;
	width: 800px;
	padding-top: 40px;
	padding-bottom: 40px;
	line-height: 1.7;
`;

const Body = styled.div`
	font-size: 1.4rem;
	padding-bottom: 40px;
	border-bottom: 1px solid white;
`;

const CommentSection = styled.div`
	margin-top: 40px;

	display: flex;
	flex-direction: column;
`;

const CommentTitle = styled.h2`
	font-size: 1.7rem;
	margin: 0 auto;
`;

const AddCommentBox = styled.div`
	textarea {
		padding: 5px;
		background-color: #222426;
		border: solid white 1px;
		color: white;
		border-radius: 10px;
		width: 100%;
		height: 80px;
		font-size: 1rem;
		font-family: inherit;
		margin-bottom: 5px;
	}

	span {
		opacity: 75%;
	}

	h3 {
		font-size: 1.1rem;
		margin-bottom: 10px;
	}

	div.name_and_button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		button {
			background-color: #3484ed;
			width: 100px;
			height: 40px;
			color: white;
			border-radius: 10px;
			border: none;
		}

		button:not(.disabled):hover {
			background-color: #0873fc;
		}

		.disabled {
			background-color: gray;
		}
	}
`;

export default function Blog({ params }) {
	const [post, setPost] = useState(null); // Initialize post with null
	const [isCommentValid, setIsCommentValid] = useState(false);
	const [userInfo, setUserInfo] = useContext(Context);
	const [isUpdated, setIsUpdated] = useState(false);
	useEffect(() => {
		fetch(`${process.env.API_ENDPOINT}posts/${params.blogName}`)
			.then((res) => res.json())
			.then((data) => setPost(data[0]))
			.catch((err) => {
				console.log(err.message);
			});
	}, [isUpdated]);
	const onDelete = async (id) => {
		const response = await fetch(
			`${process.env.API_ENDPOINT}posts/${post._id}/comments/${id}`,
			{
				withCredntials: true,
				mode: "cors",
				method: "DELETE",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		if (response.ok) {
			setIsUpdated((prev) => !prev);
		}
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new URLSearchParams(new FormData(e.currentTarget));
		try {
			const response = await fetch(
				`${process.env.API_ENDPOINT}posts/${params.blogName}/comments`,
				{
					withCredntials: true,
					mode: "cors",
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: formData,
				}
			);

			if (response.ok) {
				setIsUpdated((prev) => !prev);
			} else {
				const errorData = await response.json();
			}
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const onChange = (e) => {
		const length = e.currentTarget.value.length;

		if (length > 0) {
			setIsCommentValid(true);
		} else {
			setIsCommentValid(false);
		}
	};

	if (!post) {
		return ""; // Show loading message until post is fetched
	}

	return (
		<Content>
			<Head>
				<Title>{post.title}</Title>
				<AuthorDesc>
					<AuthorName>{post.posted_by.username}</AuthorName>
					<Date>{moment(post.created).fromNow()}</Date>
				</AuthorDesc>
			</Head>
			<Inner>
				<InnerInner>
					<Body>{post.body}</Body>
					<CommentSection>
						<CommentTitle>Comments</CommentTitle>
						{userInfo ? (
							<AddCommentBox>
								<form method="POST" onSubmit={onSubmit}>
									<textarea name="content" onChange={onChange}></textarea>
									<div className="name_and_button">
										<h3>
											<span>Logged in as</span> {userInfo.username}
										</h3>
										{isCommentValid ? (
											<button type="submit">Comment</button>
										) : (
											<button className="disabled" type="submit" disabled>
												Comment
											</button>
										)}
									</div>
								</form>
							</AddCommentBox>
						) : (
							"Login to comment."
						)}

						{post.comments.map((v) => (
							<Comment {...v} key={v._id} onDelete={onDelete} />
						))}
					</CommentSection>
				</InnerInner>
			</Inner>
		</Content>
	);
}
