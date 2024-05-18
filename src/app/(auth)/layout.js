"use client";
import { styled, createGlobalStyle } from "styled-components";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const GlobalStyle = createGlobalStyle`
	body {
		height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
	}
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
  	}`;

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={inter.className}>
			<GlobalStyle />
			<body>{children}</body>
		</html>
	);
}
