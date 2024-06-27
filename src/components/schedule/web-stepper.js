import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SchedTable from "./table";
import toast, { Toaster } from "react-hot-toast";
import { publicApiClient } from "../../api/apiClient";

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	};
}
export default function WebStepper() {
	const [detail, setDetail] = React.useState([]);
	const getData = async (category) => {
		try {
			const res = await publicApiClient.get("/event/getSchedule");
			if (res?.data?.status === "success") {
				setDetail(res?.data?.events);
			}
		} catch (err) {
			toast.error("Could Not fetch the Schedule", {
				duration: 5000,
				position: "top-center",
				style: {
					fontSize: "20px",
				},
			});
		}
	};
	React.useEffect(() => {
		getData();
	}, []);

	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<Box
			sx={{
				display: "flex",
				height: "auto",
				justifyContent: "space-evenly",
				alignItems: "center",
			}}
		>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				className="FontFamilyChanges"
				sx={{
					borderRight: 1,
					borderColor: "divider",
				}}
				TabIndicatorProps={{ style: { background: "purple" } }}
			>
				<Tab
					label="15th"
					{...a11yProps(0)}
					style={{
						fontSize: "60px",
						color: "purple",
						fontFamily: "Bebas Neue",
					}}
				/>
				<Tab
					label="16th"
					{...a11yProps(1)}
					style={{
						fontSize: "60px",
						color: "purple",
						fontFamily: "Bebas Neue",
					}}
					className=""
				/>
				<Tab
					label="17th"
					{...a11yProps(2)}
					style={{
						fontSize: "60px",
						color: "purple",
						fontFamily: "Bebas Neue",
					}}
					className=""
				/>
				{/* <Tab
					label="Day 4"
					{...a11yProps(2)}
					style={{
						fontSize: "60px",
						color: "purple",
						fontFamily: "Bebas Neue",
					}}
					className=""
				/> */}
			</Tabs>
			<TabPanel value={value} index={0}>
				{detail?.length ? (
					<SchedTable detail={detail[0]} day={1} />
				) : (
					""
				)}
			</TabPanel>
			<TabPanel value={value} index={1}>
				{detail?.length ? (
					<SchedTable detail={detail[1]} day={2} />
				) : (
					""
				)}
			</TabPanel>
			<TabPanel value={value} index={2}>
				{detail?.length ? (
					<SchedTable detail={detail[2]} day={3} />
				) : (
					""
				)}
			</TabPanel>
			{/* <TabPanel value={value} index={3}>
				{detail?.length ? (
					<SchedTable detail={detail[2]} day={3} />
				) : (
					""
				)}
			</TabPanel> */}
		</Box>
	);
}