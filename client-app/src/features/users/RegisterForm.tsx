import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function RegisterForm() {
    const {userStore} = useStore();
    const initialValues = {
        email: '',
        password: '',
        error: null,
        displayName: '',
        username: ''
    }
    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),

    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setErrors}) => 
                userStore.register(values).catch((error) => setErrors({error}))}
            validationSchema={validationSchema}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form 
                    className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Signup to Reactivties' color="teal" textAlign="center"/>
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextInput placeholder="Username" name="username" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="password" name="password" type='password' />
                    <ErrorMessage
                        name="error"
                        render={() => <ValidationError errors={errors.error as unknown as string[]} />} />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting} positive 
                        content='Register' type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})