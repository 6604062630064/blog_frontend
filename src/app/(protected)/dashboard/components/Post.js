import styled from "styled-components";
import { usePathname } from "next/navigation";
import Link from "next/link";
const LinkedDiv = styled.div`
	a {
		cursor: pointer;
		color: red;
	}
`;

const EditDiv = styled.div`
	a {
		color: green;
	}
`;

export default function Post(props) {
	const pathname = usePathname();
	return (
		<>
			<div>
				<p>{props.index}</p>
			</div>
			<div>
				<p>{props.title}</p>
			</div>
			<div>
				<p>{props.posted_by?.username}</p>
			</div>
			<EditDiv>
				<Link href={`${pathname}/edit?title=${props.title.replace(/ /g, "-")}`}>
					edit
				</Link>
			</EditDiv>
			<LinkedDiv>
				<a onClick={() => props.onDelete(props._id)}>delete</a>
			</LinkedDiv>
		</>
	);
}
