"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { createGlobalStyle, styled } from "styled-components";
import { UpdateContext } from "./components/UpdateContext";
const inter = Inter({ subsets: ["latin"] });
const GlobalStyle = createGlobalStyle`
	body {
		height: 100vh;
	}
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
  	}`;

const Header = styled.div`
	height: 45px;
	border: solid black 1px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 12px;
	margin-bottom: 15px;
`;

export default function RootLayout({ auth, children }) {
	const [userInfo, setUserInfo] = useState(false);
	const [isFetched, setIsFetched] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	useEffect(() => {
		fetch(`${process.env.API_ENDPOINT}u/loggedin`, {
			withCredentials: true,
			mode: "cors",
			method: "GET",
			credentials: "include",
		})
			.then(async (response) => {
				setIsFetched(true);
				if (response.ok) {
					const data = await response.json();

					setUserInfo(data);
				}
			})
			.catch((err) => {
				console.log(err);
				setIsFetched(true);
			});
	}, []);

	if (!isFetched) {
		return (
			<html lang="en" className={inter.className}>
				<body></body>
			</html>
		);
	}

	return (
		<html lang="en" className={inter.className}>
			<GlobalStyle />

			<body>
				<Header>
					<h1>Dashboard</h1>
					<h2>{userInfo.username}</h2>
				</Header>
				<UpdateContext.Provider value={[isUpdated, setIsUpdated]}>
					{auth}
					{children}
				</UpdateContext.Provider>
			</body>
		</html>
	);
}
