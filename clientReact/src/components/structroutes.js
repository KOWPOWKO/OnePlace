import React from 'react'
import {Route,Routes} from 'react-router-dom';

import { Home } from '../pages/home';
import { CodeBase } from '../pages/codebase';
import {Storage} from '../pages/storage'
import { DataManagement } from '../pages/datamanagement';

export const StructRoutes = () => {

  return (

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/storage/*' element={<Storage/>}></Route>
      <Route path='/CodeBase' element={<CodeBase/>}></Route>
      <Route path='/DataManagement' element={<DataManagement/>}></Route>
    </Routes>

  )
}

