import {useContext, useState} from 'react';
import { Permission } from '../store/types/permissionypes';
import PermissionContext from "./PermissionContext";

const usePermission = (permission: Permission) => {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState<boolean>();

    const {isAllowedTo} = useContext(PermissionContext);

    isAllowedTo(permission).then((allowed) => {
        setLoading(false);
        setAllowed(allowed);
    })
    return [loading, allowed]
}

export default usePermission;
