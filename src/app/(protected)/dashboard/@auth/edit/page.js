"use client";

import styled from "styled-components";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { UpdateContext } from "../../components/UpdateContext";
const Modal = styled.div`
	z-index: auto;
	display: flex;
	position: absolute;
	justify-content: center;
	flex-direction: column;
	top: 0;
	left: 0;
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.75);
	padding-left: 250px;
	padding-right: 250px;
	gap: 20px;
	transition: opacity 0.4s;
	opacity: ${(props) => props.opacity};
	button.back {
		width: 120px;
		height: 45px;
		border-radius: 10px;
		font-size: 1.4rem;
		background-color: #4f45e5;
		color: white;
		border: none;
		text-decoration: none;
	}

	button.back:hover {
		background-color: #1e3a8a;
	}
`;

const Container = styled.div`
	background: #fcd34d;
	width: 100%;
	padding: 13px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	height: 100%;
	label {
		font-size: 1.5rem;
		margin-bottom: 5px;
	}

	input {
		font-size: 1rem;
		height: 30px;
		padding: 3px;
		margin-bottom: 13px;
	}

	textarea {
		font-size: 0.9rem;
		resize: none;
		padding: 3px;
		width: 100%;
		height: 300px;
		font-family: inherit;
		margin-bottom: 30px;
	}

	button {
		font-size: 1.4rem;
		width: 150px;
		height: 40px;
		align-self: flex-end;
		background-color: #84cc16;
		border: none;
		border-radius: 15px;
	}

	button:hover {
		background-color: #a3e635;
	}
`;
export default function EditPage() {
	const [opacity, setOpacity] = useState(0);
	const [isUpdated, setIsUpdated] = useContext(UpdateContext);
	const [post, setPost] = useState(null);
	const [isFetched, setIsFetched] = useState(false);
	const router = useRouter();

	const searchParams = useSearchParams();
	const title = searchParams.get("title");

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new URLSearchParams(new FormData(e.currentTarget));
		try {
			const response = await fetch(
				`${process.env.API_ENDPOINT}posts/${title}`,
				{
					withCredntials: true,
					mode: "cors",
					method: "PUT",
					credentials: "include",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: formData,
				}
			);
			if (response.ok) {
				console.log("test");
				setIsUpdated((prev) => !prev);
				router.push("/dashboard");
			} else {
				const errorData = await response.json();
			}
		} catch (error) {
			console.error("Error:", error); // Log any network or parsing errors
		}
	};
	console.count("counter");
	useEffect(() => {
		fetch(`${process.env.API_ENDPOINT}posts/${title}`)
			.then((res) => res.json())
			.then((data) => {
				setPost(data[0]);
				setIsFetched(true);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, []);

	useEffect(() => {
		if (isFetched) {
			setOpacity(1);
		}
	}, [isFetched]);

	if (!post) {
		return "";
	} else {
		return (
			<Modal opacity={opacity}>
				<button
					className="back"
					onClick={async () => {
						setOpacity(0);
						await new Promise((res) => setTimeout(res, 400));
						router.back();
					}}
				>
					← Go back
				</button>
				<Container>
					<Form method="POST" onSubmit={onSubmit}>
						<label htmlFor="title">Title</label>
						<input
							type="text"
							name="title"
							id="title"
							defaultValue={post?.title}
						/>
						<label htmlFor="body">Body</label>
						<textarea
							name="body"
							id="body"
							defaultValue={post?.body}
						></textarea>
						<button type="submit">Submit</button>
					</Form>
				</Container>
			</Modal>
		);
	}
}
