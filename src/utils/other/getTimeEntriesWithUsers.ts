import User from '@services/api/User'

import { IId, IUser } from '@ts/auth'
import { IProjects } from '@ts/projects'
import { ITimeEntrie, ITimes } from '@ts/times'

import getId from '../string/getId'

export interface INewUser extends IId {
  lastName: string
  firstName: string
}

export default async function (timeEntries: ITimes[], project: IProjects): Promise<ITimeEntrie[]> {
  return (await Promise.all(
    timeEntries.map(async (t: ITimes) => {
      const { user } = t
      const userId = user['@id']
      const findUserByRoles =
        (project.developers ?? []).find((d) => d.user?.['@id'] === userId) ||
        (project.managers ?? []).find((m) => m.user?.['@id'] === userId)

      const findUser = !findUserByRoles && ((await User.getUserById(getId(userId))) as IUser)

      const newUser: INewUser = {
        '@id': userId,
        lastName: findUser ? findUser.person.lastName : findUserByRoles?.lastName || '',
        firstName: findUser ? findUser.person.firstName : findUserByRoles?.firstName || '',
      }

      return { ...t, user: newUser } as ITimeEntrie
    }),
  )) as ITimeEntrie[]
}
