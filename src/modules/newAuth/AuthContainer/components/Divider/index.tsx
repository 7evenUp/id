import { useTranslate } from "../../useTranslate"

import "./styles.css"

const Divider = () => {
  const t = useTranslate()

  return <p className="id_crypton_divider">{t("или")}</p>
}

export default Divider
