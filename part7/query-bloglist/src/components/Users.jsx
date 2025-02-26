import { Link } from 'react-router-dom'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@heroui/table'

const Users = ({ users }) => {
  // console.log(users)

  return (
    <div className="space-y-6">
      <h2 className="py-4 text-4xl font-semibold text-gray-950">Users</h2>
      <Table aria-label="Users against blogs posted table" className="w-6/12 text-2xl">
        <TableHeader>
          <TableColumn className="bg-gray-600 text-slate-50">User</TableColumn>
          <TableColumn className="bg-gray-600 text-slate-50">
            Blogs created
          </TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-gray-200 t">
              <TableCell className='font-semibold'>
                <Link to={`/users/${user.id}`}> {user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Users
