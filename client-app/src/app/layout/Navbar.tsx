import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

interface Props {
    toggleForm: () => void;
}

export default function NavBar({toggleForm} : Props) {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/Assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>

                <Menu.Item name="Activities"/>

                <MenuItem>

                    <Button type="button" onClick={toggleForm} positive content="Create Activity"/>
                </MenuItem>
            </Container>
        </Menu>
    )
}