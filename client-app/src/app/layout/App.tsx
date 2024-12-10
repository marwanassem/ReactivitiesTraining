import { Fragment, useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/Activity';
import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import React from 'react';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

    useEffect(() => {
      axios.get<Activity[]>('http://localhost:5000/api/activities')
        .then(response => {
          setActivities(response.data)
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
      activity.id ?
        setActivities([...activities.filter(x => x.id !== activity.id), activity])
        : setActivities([...activities, {...activity, id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
      setActivities([...activities.filter(x => x.id !== id)]);
    }

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
          />
      </Container>
    </Fragment>
  )
}

export default App
