import { NavLink, Outlet } from 'react-router'
import { UserMenu } from './userMenu/UserMenu'
import { ChatButton } from '../chat/ChatButton'
import clsx from 'clsx'

export const NavbarLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="fixed top-0 right-0 left-0 z-10 h-[65px] border-b border-gray-200 bg-white px-20">
        <div className="flex h-full items-center justify-between px-8">
          <Logo />

          <div className="flex items-center space-x-8">
            <Links />
            <UserMenu />
          </div>
        </div>
      </nav>

      <main className="mt-[65px] flex w-full flex-1 flex-col items-center justify-center bg-white">
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </main>
      <ChatButton />
    </div>
  )
}

const Logo = () => {
  return (
    <NavLink to="/" className="flex items-center space-x-2">
      <div className="bg-primary-400 flex h-8 w-8 items-center justify-center rounded-lg font-semibold text-white">
        S
      </div>
      <span className="text-primary-600 text-xl font-semibold">StudyHub</span>
    </NavLink>
  )
}

const linkArr = [
  { path: 'https://learn.ozcoding.site/lecture', label: '강의 목록' },
  { path: '/', label: '스터디 그룹' },
  { path: 'https://learn.ozcoding.site/recruit/manage', label: '구인 공고' },
]

const Links = () => {
  return (
    <>
      {linkArr.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            `nav-links ${isActive ? 'text-primary-600' : ''}`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </>
  )
}

const Footer = () => {
  const linkStyle = clsx('text-base text-gray-300 cursor-pointer')
  const titleStyle = clsx('pb-4 text-base font-semibold text-white')
  return (
    <div className="h-[313px] w-full bg-gray-900 px-20 py-12">
      <div className="flex h-[217px] max-w-[1280px] flex-col px-8">
        <div className="flex h-[128px] gap-8">
          <div className="flex h-[128px] w-[592px] flex-col">
            <span className="text-primary-400 mb-4 text-2xl font-bold">
              StudyHub
            </span>
            <span className="text-base text-gray-300">
              IT 전문가로 성장하는 여정에 함께합니다. 최고의 강의와 스터디
              그룹으로 실무 역량을 키워보세요.
            </span>
          </div>
          <div className="flex h-[128px] w-[280px] flex-col">
            <span className={titleStyle}>서비스</span>
            <div className="flex flex-col gap-2">
              {linkArr.map((el) => (
                <NavLink
                  key={el.label}
                  className={linkStyle}
                  to={el.path}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                >
                  {el.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="flex h-[128px] w-[280px] flex-col">
            <span className={titleStyle}>지원</span>
            <div className="flex flex-col gap-2">
              <span className={linkStyle}>고객센터</span>
              <span className={linkStyle}>FAQ</span>
              <span className={linkStyle}>개인정보처리방침</span>
            </div>
          </div>
        </div>
        <div className="h-[89px] w-full pt-8">
          <div className="flex justify-center border-t border-gray-800 pt-[33px]">
            <span className="text-base text-gray-400">
              © 2024 StudyHub. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
