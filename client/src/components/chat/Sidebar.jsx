"use client";
import { fetchChatUserList, selectChatUser } from "@/features/user/chatSlice";
import React, { useEffect, useState } from "react";
import { IoFilterSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector(state => state.user);
	const { users } = useSelector(state => state.chat);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		if (currentUser?.id) {
			dispatch(fetchChatUserList(currentUser.id));
		} else {
			console.log("No valid user ID");
		}
	}, [currentUser?.id, dispatch]);

	const filteredUsers = users?.filter(user =>
		user.username.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-1/4 h-[80vh] border bg-white border-r shadow-lg">
			<div className="p-4 border-b">
				<h3 className="text-2xl font-bold text-primary mb-6">Chats</h3>

				{/* Search Input */}
				<div className="flex  items-center ">
					<input
						type="text"
						placeholder="Search..."
						className="flex-1 p-2 border bg-gray-50 rounded-lg  focus:outline-none focus:ring focus:ring-indigo-300"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
					<button className="ml-2 text-primary">
						{/* Search Icon (SVG) */}
						<IoFilterSharp size={25} />
					</button>
				</div>
			</div>

			{/* Chat User List */}
			{filteredUsers?.map((item, index) => (
				<div
					onClick={() => {
						dispatch(selectChatUser(item));
					}}
					className="flex items-center p-3 bg-white hover:bg-indigo-50 transition-colors duration-300 border-b border-gray-200 cursor-pointer"
					key={index}>
					<img
						src={`https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7mTO4XUWrP5O2BuCKOE8gC%2F475d756d589257be1d8495500447fcb6%2Fanne.jpg&w=767&q=100`}
						alt={item?.name}
						className="w-12 h-12 rounded-full shadow-lg mr-4 object-cover"
					/>
					<div className="flex-1">
						<p className="text-lg font-medium text-gray-800">Sevli</p>
						<span className="text-xs text-gray-500">Last seen 1 day ago</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default Sidebar;
