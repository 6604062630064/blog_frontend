"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Context } from "@/components/Context";

import { styled, createGlobalStyle } from "styled-components";
import { Inter } from "next/font/google";
import { useContext, useEffect, useState } from "react";

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

export default function RootLayout({ children }) {
	const [userInfo, setUserInfo] = useState(false);
	const [isFetched, setIsFetched] = useState(false);

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
		<Context.Provider value={[userInfo, setUserInfo]}>
			<html lang="en" className={inter.className}>
				<GlobalStyle />
				<body>
					<Header />
					{children}
				</body>
			</html>
		</Context.Provider>
	);
}
