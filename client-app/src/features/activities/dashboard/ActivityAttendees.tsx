import { Item, List, ListItem, Popup, PopupContent } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { Link } from "react-router-dom";
import ProfileCard from "../../Profiles/profileCard";

interface Props {
    attendees: Profile[]
}

export default function ActivityAttendees ({attendees}: Props) {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup 
                    hoverable 
                    key={attendee.username} 
                    trigger={
                    <ListItem key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                        <Item.Image size='mini' circular src={attendee.Image || '/Assets/user.png'}/> 
                    </ListItem>
                }
                >
                    <PopupContent>
                        <ProfileCard profile={attendee} />
                    </PopupContent>
                </Popup>
            ))}
            
        </List>
    )
}