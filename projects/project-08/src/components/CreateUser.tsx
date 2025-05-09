import { Button, Card, TextInput, Title } from '@tremor/react'
import { useUserActions } from '../hooks/useUsersActions'

const CreateUser = () => {
    
    const { handleAddUser } = useUserActions()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        handleAddUser({name, email, github})
    }

  return (
    <Card style={{marginTop: '16px'}}>
      <Title>Create New User</Title>
      <form onSubmit={handleSubmit} className=''>
        <TextInput name='name' placeholder='Name' />
        <TextInput name='email' placeholder='Email' />
        <TextInput name='github' placeholder='Github User' />
        <div>
            <Button
                type='submit'
                style={{marginTop: '16px'}}
            >
                Create User
            </Button>
        </div>
      </form>
    </Card>
  )
}

export default CreateUser
