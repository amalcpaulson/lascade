import { Outlet } from 'react-router-dom'
import styles from './index.module.css'
import { Design, Diamond, Location, Settings } from './svg'

type Props = {}

export const Layout = (_props: Props) => {
  return (
    <div className={styles.Wrapper}>
        <div className={styles.top}>
            <button><Diamond />PRO<Design /></button>
            <div>
                <button><Location /></button>
                <button><Settings /></button>
            </div>
        </div>
        <Outlet />
    </div>
  )
}