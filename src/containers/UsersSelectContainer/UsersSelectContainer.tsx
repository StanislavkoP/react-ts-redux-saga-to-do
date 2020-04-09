import React from 'react';
import { useTypedSelector } from "redux/rootReducer";
import { SelectValue } from "antd/es/select";
import { Select } from "antd";
import { IAssignedUser } from "types/user";

const { Option } = Select;

interface IUsersSelectContainer {
    className?:string;
    value?: IAssignedUser['id'] | undefined;
    onChange?: (user: IAssignedUser | undefined) => void;
    onSearch?: (value: SelectValue) => void;
    onBlur?: () => void;
    onFocus?: () => void;
}

export function UsersSelectContainer({
    className,
    value,
    onChange,
    onSearch,
    onBlur,
    onFocus
}: IUsersSelectContainer) {
    const users = useTypedSelector(state => state.usersReducer.users);
    const isUsersLoading = useTypedSelector(state => state.usersReducer.isLoading);

    function _onChange(id: IAssignedUser['id'] | undefined) {
        if (!id && onChange) {
            onChange(undefined);
            return;
        }

        const user = id ? users.list[id] : undefined;
        if (onChange) {
            onChange(user);
        }
    }

    return (
        <Select
            className={className}
            showSearch
            allowClear
            placeholder="Select a person"
            optionFilterProp="children"
            value={value || undefined}
            onChange={_onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            loading={isUsersLoading}
            disabled={isUsersLoading}
            filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {
                users.ids.map((id) => (
                    <Option key={id} value={id}>{ users.list[id].email }</Option>
                ))
            }
        </Select>

    );
}