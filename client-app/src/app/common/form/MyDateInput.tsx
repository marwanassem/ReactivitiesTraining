import { useField } from "formik";
import DatePicker from "react-datepicker";
import { DatePickerProps } from "react-datepicker";
import { FormField, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyDateInput(props: Partial<DatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);

    return (
        <FormField error={meta.touched && !!meta.error}>
        <DatePicker
            {...field}
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) => {
                helpers.setValue(date); // Update Formik value
            }}
            //{...props} // Pass any additional props to DatePicker
        />
        {meta.touched && meta.error ? (
            <Label basic color="red">
                {meta.error}
            </Label>
        ) : null}
    </FormField>
    )
}