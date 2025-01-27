import { Button, Icon, Item, ItemDescription, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {format} from 'date-fns'
import ActivityAttendees from "./ActivityAttendees";
import { Activity } from "../../../app/models/activity";

interface Props {
    activity: Activity
}

export default function ActivityListItem ({activity}: Props) {
    return (
        <Segment.Group>
            <Segment>
            {activity.isCancelled && 
                    <Label style={{textAlign: 'center'}}
                        attached="top" color='red' content='Cancelled' 
                    />
            }
                <Item.Group>
                    <Item>
                        <Item.Image
                            style = {{marginBottom: 3}}
                            size="tiny" 
                            circular src='/Assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by {activity.host?.displayName}
                            </Item.Description>
                            {activity.isHost && (
                                <ItemDescription>
                                    <Label basic color="orange">
                                        You're hosting this activity
                                    </Label>
                                </ItemDescription>
                            )}

                            {activity.isGoing && !activity.isHost && (
                                <ItemDescription>
                                    <Label basic color="green">
                                        You're hosting this activity
                                    </Label>
                                </ItemDescription>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock"/> {format(activity.date!, 'dd MM yyyy h:mm aa')}
                    <Icon name="marker"/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityAttendees attendees={activity.attendees!}/>
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button 
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color="teal" floated="right"
                    content = 'View'
                />
            </Segment>
        </Segment.Group>
    )
}