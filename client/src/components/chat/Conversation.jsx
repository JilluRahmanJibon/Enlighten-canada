import React, { useEffect, useRef, useState } from "react";
import {
	FaPhone,
	FaVideo,
	FaMicrophone,
	FaMicrophoneSlash,
	FaPhoneSlash,
	FaCamera,
} from "react-icons/fa";
import io from "socket.io-client";
import MessageInput from "./MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversationHistory } from "@/features/user/chatSlice";
import Image from "next/image";
import { SOCKET_API_URL } from "@/utils/BaseUrl";

let socket = io(`${SOCKET_API_URL}`, {
	path: "/api/socket.io",
	autoConnect: true,
}); // Adjust to your server URL

const Conversation = () => {
	const dispatch = useDispatch();
	const { conversation, selectedUser, users } = useSelector(
		state => state.chat
	);
	const { currentUser } = useSelector(state => state.user);
	const [messages, setMessages] = useState([]);
	const [isCalling, setIsCalling] = useState(false);
	console.log("🚀 ~ Conversation ~ isCalling:", isCalling);
	const [isMuted, setIsMuted] = useState(false);
	const [isVideoCall, setIsVideoCall] = useState(false);
	const [isCameraOn, setIsCameraOn] = useState(true); // State to manage camera
	const [countdown, setCountdown] = useState(0); // Countdown state
	const [showCountdown, setShowCountdown] = useState(false); // State to manage countdown display
	const localStreamRef = useRef(null);
	const remoteStreamRef = useRef(null);
	const peerRef = useRef(null);
	const chatContainerRef = useRef(null);
	useEffect(() => {
		if (currentUser?.id && selectedUser?.id) {
			// Dispatch fetch for conversation history
			dispatch(
				fetchConversationHistory({
					userId1: currentUser.id,
					userId2: selectedUser.id,
				})
			);

			// Create a room for socket communication
			const room = [currentUser.id, selectedUser.id].sort().join("-");

			// Join the room
			socket.emit("joinRoom", room, () => console.log(`Joined room: ${room}`));

			// Set up socket listeners
			const handleReceiveMessage = message => {
				handleIncomingMessage(message);
			};

			socket.on("receiveMessage", handleReceiveMessage);
			socket.on("incomingCall", handleIncomingCall);
			// socket.on("callUser", handleIncomingCall);
			socket.on("callAccepted", handleCallAccepted);
			socket.on("iceCandidate", handleIceCandidate);

			// Clean up the socket listeners on unmount or changes
			return () => {
				socket.off("receiveMessage", handleReceiveMessage);
				socket.off("incomingCall", handleIncomingCall);
				socket.off("callAccepted", handleCallAccepted);
				socket.off("iceCandidate", handleIceCandidate);
			};
		}
	}, [currentUser?.id, selectedUser?.id, dispatch]);

	useEffect(() => {
		if (conversation?.length) {
			setMessages(conversation);
			scrollToBottom();
		}
	}, [conversation]);

	const handleIncomingMessage = newMessage => {
		// Check if the new message is already in the state
		setMessages(prevMessages => {
			// Check for duplicates based on content and timestamp
			const isDuplicate = prevMessages.some(
				message =>
					message.timestamp === newMessage.timestamp ||
					message.content === newMessage.content
			);

			if (!isDuplicate) {
				return [...prevMessages, newMessage]; // Add message only if it's not a duplicate
			}

			return prevMessages;
		});

		scrollToBottom();
	};

	const handleIncomingCall = async data => {
		setIsCalling(true);
		setCountdown(2);
		setShowCountdown(false);

		setTimeout(() => {
			setShowCountdown(true);
			const countdownInterval = setInterval(() => {
				setCountdown(prev => (prev > 0 ? prev - 1 : 0));
			}, 1000);

			// End call after 10 seconds
			setTimeout(() => {
				clearInterval(countdownInterval);
				setIsCalling(false);
				setCountdown(0);
			}, 10000);
		}, 2000);

		await answerCall(data.signal);
	};

	const handleCallAccepted = async signal => {
		await answerCall(signal);
	};

	const handleIceCandidate = data => {
		peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
	};

	const startVideoCall = async () => {
		try {
			setIsVideoCall(true);
			setIsCalling(true);

			// Request access to user's media devices (audio and video)
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: { facingMode: "user" }, // Front camera
			});

			// Log the stream to check if it's returned successfully
			console.log("Stream received:", stream);

			// Ensure the stream is not null
			if (!stream) {
				console.error("Local stream is not available!");
				return;
			}

			localStreamRef.current = stream; // Assign to localStreamRef

			// Create a new peer connection and add tracks
			peerRef.current = new RTCPeerConnection();
			stream.getTracks().forEach(track => {
				peerRef.current.addTrack(track, stream);
			});

			// Create and send the offer to the other user
			const offer = await peerRef.current.createOffer();
			await peerRef.current.setLocalDescription(offer);

			socket.emit("callUser", {
				signal: offer,
				receiver: selectedUser.id,
				sender_id: currentUser.id,
			});
		} catch (error) {
			console.error("Error in startVideoCall:", error); // Log any errors
		}
	};



const answerCall = async signal => {
	console.log("🚀 ~ answerCall ~ signal:", signal); // Received offer signal

	if (!localStreamRef.current) {
		console.error("Local stream is not available!");
		return; // Exit early if no local stream is available
	}

	// Initialize RTCPeerConnection with optional ICE servers
	peerRef.current = new RTCPeerConnection({
		iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
	});

	// Add local tracks to the peer connection
	localStreamRef.current.getTracks().forEach(track => {
		peerRef.current.addTrack(track, localStreamRef.current);
	});

	try {
		// Set remote description (offer)
		await peerRef.current.setRemoteDescription(
			new RTCSessionDescription(signal)
		);

		// Create and send an SDP answer
		const answer = await peerRef.current.createAnswer();
		await peerRef.current.setLocalDescription(answer);
		socket.emit("answer", { sdp: peerRef.current.localDescription });

		// Handle incoming remote stream
		peerRef.current.ontrack = event => {
			console.log("🚀 ~ answerCall ~ ontrack event:", event);
			const remoteStream = event.streams[0];
			remoteStreamRef.current = remoteStream;

			const remoteVideoElement = document.getElementById("remote-video");
			if (remoteVideoElement) {
				remoteVideoElement.srcObject = remoteStream;
			}
		};

		// Handle ICE candidates
		peerRef.current.onicecandidate = event => {
			if (event.candidate) {
				socket.emit("iceCandidate", { candidate: event.candidate });
			}
		};

		// Listen for ICE candidates from other peers
		socket.on("iceCandidate", ({ candidate }) => {
			peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
		});

		// Update UI state indicating the call has started
		setIsCalling(true);
	} catch (error) {
		console.error("Error during answerCall:", error);
	}
};


	const endCall = () => {
		if (peerRef.current) {
			peerRef.current.close(); // Close the peer connection
		}

		if (localStreamRef.current) {
			localStreamRef.current.getTracks().forEach(track => track.stop()); // Stop all tracks
			localStreamRef.current = null; // Clear the reference
		}

		setIsCalling(false); // Update the UI state
		setIsVideoCall(false); // Update the UI state
	};

	const toggleMute = () => {
		if (localStreamRef.current) {
			localStreamRef.current.getTracks().forEach(track => {
				track.enabled = !track.enabled; // Toggle audio track
			});
			setIsMuted(prev => !prev);
		}
	};

	const toggleCamera = () => {
		if (localStreamRef.current) {
			const videoTrack = localStreamRef.current.getVideoTracks()[0];
			videoTrack.enabled = !videoTrack.enabled; // Toggle video track
			setIsCameraOn(prev => !prev); // Correctly toggle camera state
		}
	};

	const scrollToBottom = () => {
		if (chatContainerRef.current) {
			setTimeout(() => {
				chatContainerRef.current.scrollTop =
					chatContainerRef.current.scrollHeight;
			}, 100);
		}
	};

	return (
		<div className="relative flex-1 h-[80vh] bg-white shadow-sm">
			{/* Chat Header */}
			{selectedUser && !isCalling && (
				<div className="sticky top-0 z-10 bg-white px-6 py-4 border-b shadow-sm flex items-center justify-between">
					<div className="flex items-center">
						<img
							src={`https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7mTO4XUWrP5O2BuCKOE8gC%2F475d756d589257be1d8495500447fcb6%2Fanne.jpg&w=767&q=100`}
							alt="Profile"
							className="w-10 h-10 rounded-full mr-4 cursor-pointer"
						/>
						<div>
							<p className="font-semibold text-gray-700 text-lg">
								{selectedUser.username ? selectedUser.username : "No Name"}
							</p>
							<p className="text-sm text-green-500">
								{selectedUser?.isActive ? "Active" : "Inactive"}
							</p>
						</div>
					</div>
					<div className="flex space-x-2">
						<button
							onClick={startVideoCall}
							className="p-2 rounded-full hover:bg-gray-200">
							<FaVideo />
						</button>
						<button
							onClick={startVideoCall}
							className="p-2 rounded-full hover:bg-gray-200">
							<FaPhone />
						</button>
					</div>
				</div>
			)}

			{/* Call Screen */}
			{isCalling && (
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-400 bg-opacity-80">
					<h2 className="text-white text-2xl">
						In Call with {selectedUser.username}
					</h2>
					{!showCountdown ? (
						<p className="text-white text-lg animate-pulse">Calling...</p>
					) : (
						<p className="text-white text-lg">
							{countdown > 0 ? `${countdown} seconds` : "In Call"}
						</p>
					)}
					<div className="mt-4 flex space-x-4">
						<button
							onClick={toggleMute}
							className="p-3 text-white rounded-full bg-blue-500 hover:bg-blue-600">
							{isMuted ? <FaMicrophoneSlash /> : <FaMicrophone />}
						</button>
						<button
							onClick={endCall}
							className="p-3 text-white rounded-full bg-red-500 hover:bg-red-600">
							<FaPhoneSlash />
						</button>
						{isVideoCall && (
							<button
								onClick={toggleCamera}
								className="p-3 text-white rounded-full bg-yellow-500 hover:bg-yellow-600">
								{isCameraOn ? <FaCamera /> : <>camera</>}
							</button>
						)}
					</div>
				</div>
			)}

			{/* Video Elements */}
			{isVideoCall && (
				<div className="flex items-center justify-center">
					<video
						id="local-video"
						ref={localStreamRef}
						autoPlay
						muted
						className="w-1/2 border-2 border-white"
					/>
					<video
						id="remote-video"
						ref={remoteStreamRef}
						autoPlay
						className="w-1/2 border-2 border-white"
					/>
				</div>
			)}

			{/* Chat Messages */}
			<div
				className={`${
					selectedUser && !isCalling ? "h-[calc(80vh-10rem)]" : "h-full"
				} bg-gradient-to-b from-indigo-50 via-white to-gray-50 overflow-y-auto p-6 space-y-4`}
				ref={chatContainerRef}>
				{selectedUser && !isCalling ? (
					messages.length ? (
						messages?.map((item, index) => (
							<div
								key={index} // Use a combination of sender_id and timestamp for a unique key
								className={`flex items-start gap-3 ${
									item?.sender_id === currentUser?.id
										? "justify-end"
										: "justify-start"
								}`}>
								{/* Profile picture for the other user */}
								{item?.sender_id !== currentUser?.id && (
									<img
										src="https://tandem.net/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F0uov5tlk8deu%2F7mTO4XUWrP5O2BuCKOE8gC%2F475d756d589257be1d8495500447fcb6%2Fanne.jpg&w=767&q=100"
										alt="Profile"
										className="w-8 h-8 rounded-full"
									/>
								)}

								{/* Message bubble */}
								<div
									className={`p-3 rounded-lg ${
										item?.sender_id === currentUser?.id
											? "bg-blue-500 text-white"
											: "bg-gray-200"
									}`}>
									{item?.content}
								</div>
							</div>
						))
					) : (
						<p className="text-center text-gray-400">No messages yet.</p>
					)
				) : (
					<div className="flex items-center h-full justify-center">
						<div className="flex flex-col items-center space-x-1">
							<Image
								src="https://res.cloudinary.com/dh20zdtys/image/upload/v1723709261/49f87c8af2a00c070b11e2b15349fa1c_uakips.png"
								width={150}
								height={150}
								alt="Logo"
							/>
						</div>
					</div>
				)}
			</div>
			{/* Sidebar for Profile Details */}

			{/* Message Input */}
			{!isCalling && <MessageInput selectedUser={selectedUser} />}
		</div>
	);
};

export default Conversation;
