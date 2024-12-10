import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
    activity: Activity;
    cancelSelectedActivity: () => void;
    toggleForm: (id: string) => void;
}

export default function ActivityDetails({activity, cancelSelectedActivity, toggleForm}: Props) {
    return (
        <Card fluid>
            <Image src={`/Assets/categoryImages/${activity.category}.jpg`}/>
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths='2'>
                    <Button 
                        onClick = { () => toggleForm(activity.id) } 
                        basic color="blue" content="Edit"/>
                    <Button onClick={ cancelSelectedActivity } basic color="grey" content="Cancel"/>
                </Button.Group>
            </CardContent>
        </Card>
    )
}