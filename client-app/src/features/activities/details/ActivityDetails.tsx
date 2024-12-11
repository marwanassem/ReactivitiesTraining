import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";


export default function ActivityDetails() {

    const {activityStore} = useStore();
    const {selectedActivity: activity, toggleActivityForm} = activityStore;

    if(!activity) return;

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
                        onClick = { () => toggleActivityForm(activity.id) } 
                        basic color="blue" content="Edit"/>
                    <Button onClick={() => toggleActivityForm(undefined) } basic color="grey" content="Cancel"/>
                </Button.Group>
            </CardContent>
        </Card>
    )
}