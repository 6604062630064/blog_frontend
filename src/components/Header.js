import styled from "styled-components";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Context } from "./Context";
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 30px;
	margin-bottom: 70px;
`;

const List = styled.ul`
	display: flex;
	flex-direction: row;
	gap: 15px;
`;

export default function Header() {
	const [userInfo, setUserInfo] = useContext(Context);

	const signOut = async (e) => {
		const response = await fetch(`${process.env.API_ENDPOINT}u/logout`, {
			withCredentials: true,
			mode: "cors",
			method: "GET",
			credentials: "include",
		}).then(async (response) => {
			if (response.ok) {
				window.location.reload();
			}
		});
	};
	return (
		<Wrapper>
			<List>
				<Link href="/">Blog</Link>
				<Link href="/about">About</Link>
			</List>
			{userInfo ? (
				<List>
					{userInfo.role === "admin" ? (
						<Link href="/dashboard">Dashboard</Link>
					) : (
						<></>
					)}
					<p>{userInfo.username}</p>
					<Link onClick={signOut} href="">
						Sign out
					</Link>
				</List>
			) : (
				<List>
					<Link href="/login">Login</Link>
					<Link href="/signup">Sign up</Link>
				</List>
			)}
		</Wrapper>
	);
}
