"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
const Wrapper = styled.div`
	margin: 0 auto;
	border: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
	padding: 12px;
	width: 475px;
`;

const Title = styled.div`
	font-size: 1.5rem;
	padding: 4px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	label {
		margin-bottom: 7px;
	}

	input {
		height: 30px;
		margin-bottom: 14px;
	}

	button {
		background-color: #0ea5e9;
		height: 45px;
		font-size: 1.4rem;
		color: white;
		border: solid;
	}

	button:not(.disabled):hover {
		background-color: #2563eb;
	}
	.disabled {
		background-color: gray;
	}
	p.correct:before {
		content: "✓ ";
	}

	p.correct {
		color: #16a34a;
	}

	p:before {
		content: "☓ ";
	}
	p {
		color: #dc2626;
	}
`;

export default function Signup() {
	const { push } = useRouter();
	const [valid, setValid] = useState({
		length: false,
		characters: false,
		pass_legnth: false,
	});

	const [data, setData] = useState({
		username: "",
		password: "",
		cpassword: "",
	});

	const validation = () => {
		const usernameLength = data.username.length;
		const username = data.username;
		const passwordLength = data.password.length;

		let length = false;
		let characters = false;
		let passLength = false;
		if (usernameLength >= 5 && usernameLength <= 13) {
			length = true;
		}
		if (/^([\w-]+)$/.test(username) && username !== "") {
			characters = true;
		}

		if (passwordLength >= 6 && passwordLength <= 20) {
			passLength = true;
		}
		setValid({
			length: length,
			characters: characters,
			pass_legnth: passLength,
		});
	};
	const onChange = (e) => {
		e.preventDefault();
		const { name, value } = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSummit = async (e) => {
		e.preventDefault();
		const formData = new URLSearchParams(new FormData(e.currentTarget));
		try {
			const response = await fetch(`${process.env.API_ENDPOINT}u/login`, {
				withCredntials: true,
				mode: "cors",
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: formData,
			});
			if (response.ok) {
				push("/"); // Redirect to home page upon successful signup
			} else {
				const errorData = await response.json();
			}
		} catch (error) {
			console.error("Error:", error); // Log any network or parsing errors
		}
	};
	useEffect(() => {
		validation();
	}, [data]);

	return (
		<Wrapper>
			<Title>Login</Title>
			<Form method="post" onSubmit={onSummit}>
				<label htmlFor="username">Username</label>
				<input
					type="text"
					name="username"
					autoComplete="new-password"
					onChange={onChange}
					minLength="5"
					maxLength="13"
				></input>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					autoComplete="new-password"
					onChange={onChange}
					minLength="5"
					maxLength="20"
				></input>
				<p className={valid.length ? "correct" : ""}>
					Username must be between 5 and 13 characters.
				</p>
				<p className={valid.characters ? "correct" : ""}>
					Username must only contain a-Z, digits, hyphens, and underscores.
				</p>
				<p className={valid.pass_legnth ? "correct" : ""}>
					password must be between 6 and 20 characters.
				</p>

				{Object.values(valid).every((element) => element) ? (
					<button type="submit">Login</button>
				) : (
					<button type="submit" className="disabled" disabled>
						Login
					</button>
				)}
			</Form>
		</Wrapper>
	);
}
