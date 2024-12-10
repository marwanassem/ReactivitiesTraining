import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    toggleForm: (id?: string) => void;
    upsertActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;

}

export default function ActivityDashboard(props: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList 
                    activities={props.activities}
                    selectActivity = {props.selectActivity} 
                    deleteActivity = {props.deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                { props.selectedActivity && !props.editMode &&
                    <ActivityDetails 
                        activity = {props.selectedActivity} 
                        cancelSelectedActivity = { props.cancelSelectActivity }
                        toggleForm = { props.toggleForm }/> }

                {props.editMode &&
                <ActivityForm  
                    toggleForm = { props.toggleForm }
                    activity={props.selectedActivity}
                    upsertActivity = { props.upsertActivity } /> }
            </Grid.Column>
        </Grid>
    )
}