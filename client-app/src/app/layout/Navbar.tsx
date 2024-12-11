import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {

    const {activityStore} = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/Assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>

                <Menu.Item name="Activities"/>

                <MenuItem>
                    <Button 
                        type="button" 
                        onClick={() => activityStore.toggleActivityForm(undefined)} 
                        positive content="Create Activity"/>
                </MenuItem>
            </Container>
        </Menu>
    )
}