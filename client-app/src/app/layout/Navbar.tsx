import { Button, Container, Menu, MenuItem, Image, Dropdown, DropdownItem, DropdownMenu } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function NavBar() {
    const {userStore: {user, logout}} = useStore();
    
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/Assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>

                <Menu.Item as={NavLink} to='/activities' name="Activities"/>
                <Menu.Item as={NavLink} to='/errors' name="Errors"/>

                <MenuItem>
                    <Button 
                        type="button"
                        as={NavLink} to='/createActivity'
                        positive content="Create Activity"/>
                </MenuItem>

                <MenuItem position="right">
                    <Image src={user?.image || "assets/user.png"} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <DropdownMenu>
                            <DropdownItem 
                                as={Link} to={`/profile/${user?.username}`} 
                                text='My Profile' icon='user'/>

                            <DropdownItem onClick={logout} text='Logout' icon='power' />
                        </DropdownMenu>

                    </Dropdown>
                </MenuItem>
            </Container>
        </Menu>
    )
})