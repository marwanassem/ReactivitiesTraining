import { SyntheticEvent, useState } from "react";
import { Activity } from "../../../app/models/Activity";
import { Button, Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList(props: Props) {
    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        props.deleteActivity(id);
    }


    return (
        <Segment>
            <Item.Group divided>
                { props.activities.map(activity => (
                    <Item key = {activity.id}>
                        <Item.Header as='a'> {activity.title} </Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            <Button onClick={() => props.selectActivity(activity.id)} 
                                floated='right' content='View' color='blue'/>
                            <Button
                                name={activity.id}
                                loading = {props.submitting && target === activity.id} 
                                onClick={(e) => handleActivityDelete(e, activity.id)} 
                                floated='right' content='Delete' color='red'/>
                            <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item>
                ))}

            </Item.Group>
        </Segment>
    )
}