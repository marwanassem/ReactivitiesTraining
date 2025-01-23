import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const {userStore} = useStore();
    const initialValues = {
        email: '',
        password: '',
        error: null
    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setErrors}) => 
                userStore.login(values).catch(() => setErrors({error: 'Invalid email or password!'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form 
                    className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Login to Reactivties' color="teal" textAlign="center"/>
                    <MyTextInput placeholder="email" name="email" />
                    <MyTextInput placeholder="password" name="password" type='password' />
                    <ErrorMessage
                        name="error"
                        render={() => <Label style={{marginBottom: 10}} basic color="red"
                        content={errors.error} />} />
                    <Button 
                        loading={isSubmitting} positive 
                        content='Login' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})