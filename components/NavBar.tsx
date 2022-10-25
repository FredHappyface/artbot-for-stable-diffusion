/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useStore } from 'statery'
import styled from 'styled-components'

import { useWindowSize } from '../hooks/useWindowSize'
import {
  appInfoStore,
  setNewImageReady,
  setShowImageReadyToast
} from '../store/appStore'
import { isInstalledPwa } from '../utils/appUtils'

import IconCreate from './icons/CreateIcon'
import HourglassIcon from './icons/HourglassIcon'
import PhotoIcon from './icons/PhotoIcon'
import PhotoPlusIcon from './icons/PhotoPlusIcon'
import SettingsIcon from './icons/SettingsIcon'

const StyledNavBar = styled.nav`
  display: none;

  @media (min-width: 640px) {
    border-bottom: 1px solid rgb(229, 231, 235);
    color: white;
    display: flex;
    font-size: 14px;
    justify-content: flex-start;
    margin-bottom: 8px;
    width: 100%;
  }
`

export default function NavBar() {
  const size = useWindowSize()
  const router = useRouter()
  const { pathname } = router

  const appState = useStore(appInfoStore)
  const { newImageReady } = appState

  const [hideNavBar, setHideNavBar] = useState(false)

  const clearNewImageNotification = () => {
    setShowImageReadyToast(false)
    setNewImageReady('')
  }

  const handleForceReload = () => {
    if ('/images' === pathname) {
      window.location.reload()
    }
  }

  const isActiveRoute = (page: string) => {
    if (page === pathname) {
      return 'inline-block p-2 text-teal-500 rounded-t-lg border-b-2 border-teal-500 active0'
    }

    return 'inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-teal-500 hover:border-teal-500'
  }

  useEffect(() => {
    const { width = 0 } = size

    if (width < 640 && isInstalledPwa()) {
      setHideNavBar(true)
    }
  }, [size])

  if (hideNavBar) {
    return null
  }

  return (
    <StyledNavBar>
      <ul className="flex flex-row">
        <li className="text-left">
          <Link href="/" passHref className={isActiveRoute('/')}>

            <IconCreate className="inline-block mr-1 pb-1" />Create
          </Link>
        </li>
        <li className="text-left">
          <Link href="/pending" passHref className={isActiveRoute('/pending')}>

            <HourglassIcon className="inline-block mr-[2-px] pb-1" />Pending
          </Link>
        </li>
        <li className="text-left">
          <Link
            href="/images"
            passHref
            className={isActiveRoute('/images')}
            onClick={() => {
              clearNewImageNotification()
              handleForceReload()
            }}>

            {newImageReady ? (
              <PhotoPlusIcon
                className="inline-block mr-[2-px] pb-1"
                stroke={'red'}
              />
            ) : (
              <PhotoIcon className="inline-block mr-[2-px] pb-1" />
            )}Images
          </Link>
        </li>
        <li className="text-left">
          <Link href="/settings" passHref className={isActiveRoute('/settings')}>

            <SettingsIcon className="inline-block mr-[2-px] pb-1" />Settings
          </Link>
        </li>
      </ul>
    </StyledNavBar>
  );
}
