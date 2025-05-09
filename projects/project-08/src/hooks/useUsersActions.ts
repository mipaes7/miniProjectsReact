import { deleteUserById, type UserId, addUser, type User } from '../store/users/slice'
import { useAppDispatch } from './store'

export const useUserActions = () => {
        const dispatch = useAppDispatch()
    
        const handleDeleteUser = (id: UserId) => {
            dispatch(deleteUserById(id))
        }

        const handleAddUser = ({name, email, github}) => {
            dispatch(addUser({name, email, github}))
        }

        return {
            handleDeleteUser,
            handleAddUser
        }
}