"use client";

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Post from "./components/Post";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UpdateContext } from "./components/UpdateContext";
const Button = styled.div`
	background-color: lightgreen;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90px;
	height: 30px;
	margin-bottom: 15px;
	border-radius: 5px;
`;

const Table = styled.div`
	display: grid;
	grid-template-columns: 0.4fr 2.5fr 1.1fr 0.7fr 0.7fr;
	width: 70%;
	grid-auto-rows: 45px;
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
		border-bottom: solid black 1px;
	}

	p.head {
		font-size: 1.3rem;
	}
`;
const Wrapper = styled.div`
	padding-left: 120px;
	padding-right: 120px;

	a {
		text-decoration: none;
	}
`;
export default function Dashboard() {
	const [postData, setPostData] = useState(null);
	const [isUpdate, setIsUpdate] = useContext(UpdateContext);
	const pathname = usePathname();
	useEffect(() => {
		fetch(`${process.env.API_ENDPOINT}posts`, {
			method: "GET",
		})
			.then(async (response) => {
				if (response.ok) {
					const data = await response.json();
					setPostData(data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [isUpdate]);

	const onDelete = async (id) => {
		console.log(id);
		const response = await fetch(`${process.env.API_ENDPOINT}posts/${id}`, {
			withCredntials: true,
			mode: "cors",
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		if (response.ok) {
			setIsUpdate((prev) => !prev);
		}
	};

	// if (!postData) {
	// 	return "";
	// }

	return (
		<Wrapper>
			<Link href={`${pathname}/create`}>
				<Button>Add post</Button>
			</Link>
			<Table>
				<div>
					<p className="head">No.</p>
				</div>
				<div>
					<p className="head">Title</p>
				</div>
				<div>
					<p className="head">Author</p>
				</div>
				<div>
					<p className="head">Action</p>
				</div>
				<div></div>
				{postData?.map((element, index) => (
					<Post
						{...element}
						key={element._id}
						index={index}
						onDelete={onDelete}
					></Post>
				))}
			</Table>
		</Wrapper>
	);
}
