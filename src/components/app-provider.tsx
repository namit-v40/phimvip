'use client'

import { AccountResType } from '@/schema/account.schema';
import { useLocale } from 'next-intl';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

type User = AccountResType['data']

const AppContext = createContext<{
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  isAdmin: boolean
  currentLocale: string
}>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  isAdmin: false,
  currentLocale: ''
})
export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}
export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(() => {
    return null
  })

  const locale = useLocale();
  const [currentLocale, setCurrentLocale] = useState(locale);

  const isAuthenticated = Boolean(user)
  const isAdmin = Boolean(user?.roles.includes("ROLE_ADMIN"))
  const setUser = useCallback(
    (user: User | null) => {
      setUserState(user)
      localStorage.setItem('user', JSON.stringify(user))
    },
    [setUserState]
  )

  useEffect(() => {
    const _user = localStorage.getItem('user')
    setUserState(_user ? JSON.parse(_user) : null)
  }, [setUserState])

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale])

  return (
    <AppContext.Provider value={{ user, setUser, isAuthenticated, isAdmin, currentLocale }} >
      {children}
    </AppContext.Provider>
  )
}