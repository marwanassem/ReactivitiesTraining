import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/Assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>

                <Menu.Item as={NavLink} to='/activities' name="Activities"/>

                <MenuItem>
                    <Button 
                        type="button"
                        as={NavLink} to='/createActivity'
                        positive content="Create Activity"/>
                </MenuItem>
            </Container>
        </Menu>
    )
}