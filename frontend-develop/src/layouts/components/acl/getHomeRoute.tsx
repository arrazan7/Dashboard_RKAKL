/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = (role: string) => {
  if (role === 'user') return '/401'
  else return '/dashboard'
}

export default getHomeRoute
