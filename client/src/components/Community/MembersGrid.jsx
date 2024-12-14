"use client";
import React, { useState } from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import HighlightedProfiles from "./HighlightedProfiles";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "@/features/user/userSlice";

// const members = [
// 	{
// 		name: "Patrick",
// 		description:
// 			"Looking for a partner to share my cooking skills and recipes...",
// 		country: "Germany",
// 		languages: ["DE", "EN"],
// 		image:
// 			"https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7I4r5LgUpRb9f4ZzcNCkbs%2Fee701fee9b1adbacc40eebc39f7eced4%2Fstefania.jpg&w=767&q=100",
// 		status: "offline",
// 	},
// 	{
// 		name: "Patrick",
// 		description:
// 			"Looking for a partner to share my cooking skills and recipes...",
// 		country: "Germany",
// 		languages: ["DE", "EN"],
// 		image:
// 			"https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7I4r5LgUpRb9f4ZzcNCkbs%2Fee701fee9b1adbacc40eebc39f7eced4%2Fstefania.jpg&w=767&q=100",
// 		status: "offline",
// 	},
// 	{
// 		name: "Patrick",
// 		description:
// 			"Looking for a partner to share my cooking skills and recipes...",
// 		country: "Germany",
// 		languages: ["DE", "EN"],
// 		image:
// 			"https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7I4r5LgUpRb9f4ZzcNCkbs%2Fee701fee9b1adbacc40eebc39f7eced4%2Fstefania.jpg&w=767&q=100",
// 		status: "offline",
// 	},
// 	{
// 		name: "Patrick",
// 		description:
// 			"Looking for a partner to share my cooking skills and recipes...",
// 		country: "Germany",
// 		languages: ["DE", "EN"],
// 		image:
// 			"https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7I4r5LgUpRb9f4ZzcNCkbs%2Fee701fee9b1adbacc40eebc39f7eced4%2Fstefania.jpg&w=767&q=100",
// 		status: "offline",
// 	},
// 	{
// 		name: "Patrick",
// 		description:
// 			"Looking for a partner to share my cooking skills and recipes...",
// 		country: "Germany",
// 		languages: ["DE", "EN"],
// 		image:
// 			"https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7I4r5LgUpRb9f4ZzcNCkbs%2Fee701fee9b1adbacc40eebc39f7eced4%2Fstefania.jpg&w=767&q=100",
// 		status: "offline",
// 	},
// 	{
// 		name: "Patrick",
// 		description:
// 			"Looking for a partner to share my cooking skills and recipes...",
// 		country: "Germany",
// 		languages: ["DE", "EN"],
// 		image:
// 			"https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7I4r5LgUpRb9f4ZzcNCkbs%2Fee701fee9b1adbacc40eebc39f7eced4%2Fstefania.jpg&w=767&q=100",
// 		status: "offline",
// 	},
// 	// Add more member data as needed
// ];

const MemberCard = () => {
	const dispatch = useDispatch();
	const { users, loading, error } = useSelector(state => state.user);

	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<>
			{users?.length > 0 ? (
				users.map(user => (
					<Link
						key={user.id} // Ensure you have a unique key for each element in the list
						href={`/community/${user?.id}`}
						className="bg-white border rounded-lg p-3 flex items-center space-x-4">
						<img
							src={`https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7I4r5LgUpRb9f4ZzcNCkbs%2Fee701fee9b1adbacc40eebc39f7eced4%2Fstefania.jpg&w=767&q=100`}
							alt="Mia"
							className="w-28 h-full rounded-lg object-cover"
						/>
						<div className="flex-1">
							<div className="flex items-center space-x-2 mb-1">
								<span className="block w-3 h-3 rounded-full bg-green-400"></span>
								<h3 className="font-semibold text-lg">{user?.username}</h3>
							</div>
							<p className="text-sm text-gray-600">
								<span className="text-red-500">

								{ user.email} 
								</span>  One morning, when Gregor Samsa woke from troubled dreams, he
								found himself crying
							</p>
							<div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
								<div className="flex gap-2 items-center">
									<span className="font-medium text-black">SPEAKS</span>
									<img
										src="https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F6qrkxBrPq9aO0bh7rYWsri%2F9cfbf292341985c41a7f1b44db656289%2Fbr.svg&w=32&q=75"
										alt="ES"
										className="w-5 rounded-full object-cover h-5 ml-1"
									/>
									<span className="ml-1">ES</span>
								</div>
								<div className="flex items-center">
									<span className="font-medium text-black">LEARNS</span>
									<img
										src="https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2FamnW47KuOWKGDm3SvuZIG%2Fc6d7f07d34efb48abc147f190eddbd42%2Fmx.svg&w=32&q=75"
										alt="KR"
										className="w-5 rounded-full object-cover h-5 ml-1"
									/>
									<span className="ml-1">KR</span>
								</div>
							</div>
						</div>
					</Link>
				))
			) : (
				<div>No users found</div>
			)}
		</>
	);
};

const Tabs = () => {
	const [activeTab, setActiveTab] = useState("All members");

	const tabs = [
		{ name: "All members", icon: "🔍" },
		{ name: "Near me", icon: "📍" },
		{ name: "Travel", icon: "✈️" },
	];

	return (
		<div className="flex gap-5 py-7">
			{tabs.map(tab => (
				<button
					key={tab.name}
					onClick={() => setActiveTab(tab.name)}
					className={`flex items-center hover:bg-gray-800 transition-all hover:text-white px-4 py-2 rounded-full transition-colors ${
						activeTab === tab.name
							? "bg-gray-800 text-white"
							: "bg-transparent border border-gray-300 text-gray-700"
					}`}>
					<span className="mr-2">{tab.icon}</span>
					{tab.name}
				</button>
			))}
		</div>
	);
};

const SearchBar = () => {
	return (
		<div className="flex items-center gap-4 max-w-md">
			<div className="flex items-center bg-gray-200 rounded-full px-4 py-2 flex-grow">
				<FiSearch className="text-gray-500 mr-2" />
				<input
					type="text"
					placeholder="Find members or topics"
					className="bg-transparent outline-none text-gray-700 placeholder-gray-500 flex-grow"
				/>
			</div>
			<button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
				<FiSliders className="text-gray-500" />
			</button>
		</div>
	);
};
const MembersGrid = () => {
	return (
		<div className="p-4 min-h-screen">
			{/* Top Navigation Bar */}
			<div className=" max-w-[1450px] mx-auto">
				<div className="flex items-center justify-between">
					<Tabs />
					<SearchBar />
				</div>
				{/* Members Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<MemberCard />
				</div>
				<HighlightedProfiles />
				{/* Members Grid */}
				{/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{members.map((member, index) => (
						<MemberCard member={member} key={index} />
					))}
				</div> */}
			</div>
		</div>
	);
};

export default MembersGrid;
