"use client";

import {
	Box,
	Button,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "rgba(255, 255, 255, 0.9)", // Slight transparency
	borderRadius: "15px",
	boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
	p: 4,
	display: "flex",
	flexDirection: "column",
	gap: 3,
	backdropFilter: "blur(8px)", // Background blur effect
};

export default function Home() {
	const [pantry, setPantry] = useState([]);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [itemName, setItemName] = useState("");

	const updatePantry = async () => {
		const snapshot = collection(firestore, "pantry-items");
		const docs = await getDocs(snapshot);

		const pantryList = [];
		docs.forEach((doc) => {
			pantryList.push({ name: doc.id, ...doc.data() });
		});
		setPantry(pantryList);
	};

	useEffect(() => {
		updatePantry();
	}, []);

	const addItem = async (item) => {
		const docRef = doc(collection(firestore, "pantry-items"), item);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const { count } = docSnap.data();
			await setDoc(docRef, { count: count + 1 });
		} else {
			await setDoc(docRef, { count: 1 });
		}
		await updatePantry();
	};

	const removeItem = async (item) => {
		const docRef = doc(collection(firestore, "pantry-items"), item);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const { count } = docSnap.data();
			if (count === 1) {
				await deleteDoc(docRef);
			} else {
				await setDoc(docRef, { count: count - 1 });
			}
		}
		await updatePantry();
	};

	return (
		<Box
			width="100vw"
			height="100vh"
			display="flex"
			justifyContent="center"
			flexDirection="column"
			alignItems="center"
			gap={2}
			sx={{
				background: "linear-gradient(135deg, #f8f9fa, #dde6f2)", // Gradient background
				backgroundImage: `url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')`, // Texture on top
				backgroundSize: "cover",
				padding: 5,
			}}
		>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						sx={{ fontWeight: "bold", color: "#555" }}
					>
						Add Item
					</Typography>
					<Stack width="100%" direction="row" spacing={2}>
						<TextField
							id="outlined-basic"
							label="Item"
							variant="outlined"
							fullWidth
							value={itemName}
							onChange={(e) => {
								setItemName(e.target.value);
							}}
						/>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "#4CAF50",
								color: "#fff",
								"&:hover": { backgroundColor: "#45a049" },
								borderRadius: "20px",
							}}
							onClick={() => {
								addItem(itemName);
								setItemName("");
								handleClose();
							}}
						>
							Add
						</Button>
					</Stack>
				</Box>
			</Modal>
			<Button
				variant="contained"
				onClick={handleOpen}
				sx={{
					backgroundColor: "#1976D2",
					color: "#fff",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
					borderRadius: "20px",
					"&:hover": {
						backgroundColor: "#1565C0",
					},
				}}
			>
				Add
			</Button>
			<Box
				border="1px solid rgba(51, 51, 51, 0.5)"
				borderRadius="15px"
				overflow="hidden"
				boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
				bgcolor="rgba(255, 255, 255, 0.8)" // Transparent white
				sx={{
					backdropFilter: "blur(8px)", // Background blur effect for transparency
				}}
			>
				<Box
					width="800px"
					height="100px"
					bgcolor="#1976D2"
					display="flex"
					justifyContent="center"
					alignItems="center"
					borderRadius="15px 15px 0 0" // Round top corners
				>
					<Typography
						variant="h2"
						color="#fff"
						textAlign="center"
						sx={{ fontWeight: "bold" }}
					>
						Pantry Items
					</Typography>
				</Box>
				<Stack
					width="800px"
					height="300px"
					spacing={2}
					overflow="auto"
					sx={{
						padding: 2,
						backgroundColor: "rgba(245, 245, 245, 0.8)", // Light transparent background
						backdropFilter: "blur(4px)", // Subtle blur for modern effect
					}}
				>
					{pantry.map(({ name, count }) => (
						<Box
							key={name}
							width="100%"
							minHeight="150px"
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							bgcolor="#fff"
							paddingX={5}
							borderRadius="10px"
							boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
						>
							<Typography
								variant="h4"
								color="#333"
								textAlign="center"
								sx={{ fontWeight: "bold" }}
							>
								{name.charAt(0).toUpperCase() + name.slice(1)}
							</Typography>
							<Typography variant="h5" color="#333" textAlign="center">
								Quantity: {count}
							</Typography>
							<Button
								variant="contained"
								sx={{
									backgroundColor: "#E53935",
									color: "#fff",
									borderRadius: "20px",
									"&:hover": { backgroundColor: "#D32F2F" },
								}}
								onClick={() => removeItem(name)}
							>
								Remove
							</Button>
						</Box>
					))}
				</Stack>
			</Box>
		</Box>
	);
}
