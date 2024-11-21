import { useSelector } from "react-redux";
import { Collapse, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from "react";

function HomePage()  {
	// load redux state
	const state = useSelector(state => state.userData);

	// Nested list status
	const [open, setOpen] = useState({});

	// On click event handler
  const handleClick = (id) => {
    setOpen((prev) => ({
			...prev,
			[id]: !prev[id]
		}));
  };

	return (
		<List sx={{ 
			width: '100%',
			maxWidth: 800,
			bgcolor: 'background.paper',
			marginLeft: 'auto',
			marginRight: 'auto',
			marginTop: '0vh'
		}}>
			{/* Loop through array of users */}
			{state.userData.map((value) => {
				return (
					<>
						<ListItem sx={{
								borderBottom: '1px solid',
								padding: '1rem'
							}}
							key={value.id}
							disableGutters
							secondaryAction={
								// Show details or not
								<IconButton aria-label="detail" onClick={() => handleClick(value.id)}>
									{open[value.id] ? <ExpandLess /> : <ExpandMore />}
								</IconButton>
							}
						>
							<ListItemText primary={`Name: ${value.name}`} />
						</ListItem>
						<Collapse in={open[value.id]} timeout="auto" unmountOnExit>
						<List sx={{bgcolor: '#EEEEEE'}} component="div" disablePadding>
							<ListItem>
								<ListItemText primary={`Email: ${value.email}`} />
							</ListItem>
							<ListItem>
								<ListItemText primary={`Phone: ${value.phone}`} />
							</ListItem>
							<ListItem>
								<ListItemText primary={`Address: ${value.address.suite} ${value.address.street}, ${value.address.city}, ${value.address.zipcode}`} />
							</ListItem>
							<ListItem>
								<ListItemText primary={`Website: ${value.website}`} />
							</ListItem>
							<ListItem>
								<ListItemText primary={`Company: ${value.company}`} />
							</ListItem>
						</List>
						</Collapse>
					</>
				);
			})}
		</List>
	)
}

export default HomePage;