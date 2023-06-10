import { useTranslation } from 'react-i18next'

import { ReactComponent as Web3Logo } from "@/assets/icons/utility/Web3_logo.svg"
import { ReactComponent as MailLogo } from "@/assets/icons/utility/Mail_logo.svg"

import ResearchAuthImage from "@/assets/images/auth_research.png"
import AuthButton from './components/AuthButton'
import { useMetamask } from '@/hooks/useMetamask'

const NewAuth = () => {
  const { t } = useTranslation("auth")

  const {
    state: { isMetamaskInstalled },
  } = useMetamask()

  const handleConnect = async () => {

  }
  
  return (
    <div className="flex border border-gray-1 rounded-xl w-full mobile:w-auto ms-auto me-auto">
      <div className="flex flex-col justify-between gap-6 py-8 px-9 bg-white rounded-xl md:rounded-none md:rounded-l-xl text-gray-1 w-full mobile:w-[370px] min-h-[340px]">
        <div className="flex flex-col">
          <h2 className="text-lg font-medium text-black mb-10 max-w-[260px]">
            {t("login.heading")}
          </h2>
          <div className="flex gap-3 flex-wrap items-center my-3.5">
      {isMetamaskInstalled ? (
        <AuthButton onClick={handleConnect}>
          <Web3Logo />
          <span>{t("web3-btn")}
          </span>
        </AuthButton>
      ) : (
        <a href="https://metamask.io/" target="_blank">
          <AuthButton>
            <Web3Logo />
            <span>{t("web3-btn")}</span>
          </AuthButton>
        </a>
      )}
      <AuthButton onClick={() => {}}>
        <MailLogo />
        <span>{t("email-btn")}</span>
      </AuthButton>
    </div>
        </div>
      </div>
      <div className="hidden md:block w-[350px] border-l border-gray-1">
        <img
          src={ResearchAuthImage}
          alt="research auth intro"
          className="w-[350px] min-h-[400px] h-full object-cover rounded-r-xl"
        />
      </div>
    </div>
  )
}

export default NewAuth