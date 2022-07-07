import React from 'react'
import { Link, Router } from 'react-router-dom'
import '../style/navigation.css'

export const MainNavigation = () => {
  return (
    <header>
            <div>
                <nav>
                    <ul className='navigation'>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='storage'>File System</Link>
                        </li>
                        <li>
                            <Link to='CodeBase'>Code Base</Link>
                        </li>
                        <li>
                            <Link to='/DataManagement'>Data Management</Link>
                        </li>
                    </ul>
                </nav>
            </div>
    </header>
    
  )
}
