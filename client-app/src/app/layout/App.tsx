import { Fragment, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import React from 'react';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
      agent.Activities.list().then(response => {
          let activities: Activity[] = []
          response.forEach(activity => {
            activity.date = activity.date.split('T')[0];
            activities.push(activity);
          })
          setActivities(activities);
          setLoading(false);
        })
    }, [])

    function handleSelectActivity(id: string) {
      setSelectedActivity(activities.find(activity => activity.id === id))
    }

    function handleCancelSelectActivity() {
      setSelectedActivity(undefined);
    }

    function handleToggleForm(id?: string) {
      id ? handleSelectActivity(id) : handleCancelSelectActivity();
      setEditMode(!editMode);
    }

    function handleUpsertActivity(activity: Activity) {
      setSubmitting(true);
      if(activity.id) {
        agent.Activities.update(activity).then(() => {
          setActivities([...activities.filter(x => x.id !== activity.id), activity])
        })
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      } else {
          activity.id = uuid();
          agent.Activities.create(activity).then(() => {
            setActivities([...activities, {...activity}]);
          })
          setEditMode(false);
          setSelectedActivity(activity);
          setSubmitting(false);
        }
      }

    function handleDeleteActivity(id: string) {
      setSubmitting(true);
      agent.Activities.delete(id).then(() => {
        setActivities([...activities.filter(x => x.id !== id)]);
        setSubmitting(false);
        setSelectedActivity(undefined);
      })
    }

  if (loading) return <LoadingComponent content='Loading app' inverted={false} />

  return (
    <Fragment>
      <React.Fragment>
      <NavBar toggleForm={handleToggleForm}/>

      </React.Fragment>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities = { activities }
          selectedActivity = { selectedActivity }
          selectActivity = { handleSelectActivity }
          cancelSelectActivity = { handleCancelSelectActivity }
          editMode = { editMode }
          toggleForm = { handleToggleForm }
          upsertActivity = { handleUpsertActivity }
          deleteActivity = { handleDeleteActivity }
          submitting = { submitting }
          />
      </Container>
    </Fragment>
  )
}

export default App
