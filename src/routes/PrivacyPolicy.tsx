import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Subheading from "@/shared/typography/Subheading"
import TextAccent from "@/shared/typography/TextAccent"
import Text0 from "@/shared/typography/Text0"
import TextXs from "@/shared/typography/TextXs"

import { useAppSelector } from "@/redux/hooks"

import { cn } from "@/lib/classNames"

const PrivacyPolicy = () => {
  const { t } = useTranslation("privacy")

  const scale = useAppSelector((state) => state.scale.value)

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-6",
        scale && "3xl:gap-[1.5625vw]"
      )}
    >
      <Subheading>{t("Политика конфиденциальности – Crypton")}</Subheading>

      <div
        className={cn(
          "flex flex-col gap-3 max-w-[700px]",
          scale && "3xl:gap-[0.78125vw] 3xl:max-w-[45vw]"
        )}
      >
        <TextAccent className="mt-4">{t("1. Введение")}</TextAccent>
        <Text0>
          {t(
            'Настоящая Политика конфиденциальности описывает, как Crypton (далее "Компания", "мы", "нас" или "наш") собирает, использует, защищает и раскрывает вашу личную информацию, когда вы используете веб-сайт Crypton (далее "Сайт").'
          )}
        </Text0>

        <TextAccent className="mt-4">{t("2. Сбор информации")}</TextAccent>
        <Text0>{t("Мы можем собирать следующую информацию:")}</Text0>
        <ul className="list-disc">
          <li className="ml-4">
            <Text0>
              {t("Информация, которую вы предоставляете напрямую:")}
            </Text0>
            <ul className="list-[circle]">
              <li className="ml-4">
                <TextXs>
                  {t(
                    "Имя, адрес электронной почты и контактные данные, когда вы связываетесь с нами или оставляете комментарии."
                  )}
                </TextXs>
              </li>
              <li className="ml-4">
                <TextXs>
                  {t(
                    "Информация, которую вы предоставляете при подписке на рассылки или при участии в опросах."
                  )}
                </TextXs>
              </li>
            </ul>
          </li>
          <li className="ml-4">
            <Text0>
              {t("Информация, собираемая автоматически:")}
              <ul className="list-[circle]">
                <li className="ml-4">
                  <TextXs>
                    {t(
                      "IP-адрес, тип браузера, операционная система, язык, время доступа, посещенные страницы и URL-адреса переходов (через файлы cookie и другие технологии отслеживания)."
                    )}
                  </TextXs>
                </li>
                <li className="ml-4">
                  <TextXs>{t("Информация о взаимодействии с Сайтом.")}</TextXs>
                </li>
              </ul>
            </Text0>
          </li>
        </ul>

        <TextAccent className="mt-4">
          {t("3. Использование информации")}
        </TextAccent>
        <Text0>
          {t("Мы можем использовать собранную информацию для следующих целей:")}
        </Text0>
        <ul className="list-disc">
          <li className="ml-4">
            <Text0>{t("Предоставление и улучшение работы Сайта.")}</Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t("Ответы на ваши запросы и предоставление поддержки.")}
            </Text0>
          </li>
          <li className="ml-4">
            <Text0>{t("Персонализация вашего опыта на Сайте.")}</Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t(
                "Отправка вам обновлений, рассылок и рекламных материалов (с вашего согласия)."
              )}
            </Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t(
                "Анализ использования Сайта для улучшения его функциональности и контента."
              )}
            </Text0>
          </li>
          <li className="ml-4">
            <Text0>{t("Соблюдение требований законодательства.")}</Text0>
          </li>
        </ul>

        <TextAccent className="mt-4">{t("4. Обмен информацией")}</TextAccent>
        <Text0>
          {t(
            "Мы можем раскрывать вашу личную информацию следующим третьим лицам:"
          )}
        </Text0>
        <ul className="list-disc">
          <li className="ml-4">
            <Text0>
              {t(
                "Поставщики услуг: Компании, которые помогают нам предоставлять и поддерживать Сайт (например, хостинг, аналитика, обработка электронной почты)."
              )}
            </Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t(
                "В соответствии с требованиями закона: Если это требуется по закону или в ответ на законный запрос государственных органов."
              )}
            </Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t(
                "Защита прав: Если мы считаем, что это необходимо для защиты прав, собственности или безопасности Компании, пользователей или других лиц."
              )}
            </Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t(
                "С вашего согласия: С другими третьими лицами, с вашего согласия."
              )}
            </Text0>
          </li>
        </ul>

        <TextAccent className="mt-4">
          {t("5. Файлы cookie и другие технологии отслеживания")}
        </TextAccent>
        <Text0>
          {t(
            "Мы используем файлы cookie и другие технологии отслеживания для сбора информации о вашем взаимодействии с Сайтом. Вы можете управлять файлами cookie в настройках вашего браузера."
          )}
        </Text0>

        <TextAccent className="mt-4">{t("6. Защита информации")}</TextAccent>
        <Text0>
          {t(
            "Мы принимаем разумные меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако никакая система безопасности не может быть гарантированно защищенной."
          )}
        </Text0>

        <TextAccent className="mt-4">{t("7. Ваши права")}</TextAccent>
        <Text0>{t("Вы имеете право:")}</Text0>
        <ul className="list-disc">
          <li className="ml-4">
            <Text0>{t("Доступа к вашей личной информации.")}</Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t("Исправить неточности в вашей личной информации.")}
            </Text0>
          </li>
          <li className="ml-4">
            <Text0>{t("Удалить вашу личную информацию.")}</Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t(
                "Ограничить или возразить против обработки вашей личной информации."
              )}
            </Text0>
          </li>
          <li className="ml-4">
            <Text0>
              {t("Отказаться от получения маркетинговых рассылок.")}
            </Text0>
          </li>
        </ul>
        <Text0>
          {t(
            'Чтобы воспользоваться своими правами, свяжитесь с нами по адресу, указанному в разделе "Контакты".'
          )}
        </Text0>

        <TextAccent className="mt-4">{t("8. Хранение информации")}</TextAccent>
        <Text0>
          {t(
            "Мы храним вашу личную информацию в течение периода, необходимого для достижения целей, описанных в настоящей Политике, или в течение периода, установленного законом."
          )}
        </Text0>

        <TextAccent className="mt-4">
          {t("9. Изменения в политике конфиденциальности")}
        </TextAccent>
        <Text0>
          {t(
            "Мы оставляем за собой право изменять настоящую Политику конфиденциальности в любое время. Изменения вступают в силу с момента их публикации на Сайте. Ваше дальнейшее использование Сайта после публикации изменений означает ваше согласие с этими изменениями. Мы рекомендуем вам периодически просматривать настоящую Политику."
          )}
        </Text0>

        <TextAccent className="mt-4">
          {t("10. Передача данных в другие страны")}
        </TextAccent>
        <Text0>
          {t(
            "Ваша личная информация может передаваться и обрабатываться в других странах, где законы о защите персональных данных могут отличаться от законов вашей страны."
          )}
        </Text0>

        <TextAccent className="mt-4">{t("11. Контакты")}</TextAccent>
        <Text0 className="inline">
          {t(
            "Если у вас есть какие-либо вопросы или комментарии относительно этих Условий, свяжитесь с нами по адресу:"
          )}{" "}
          <a
            href="mailto:help@crypton.xyz"
            className="w-fit underline-offset-4 underline hover:opacity-80 inline"
          >
            help@crypton.xyz
          </a>
        </Text0>
      </div>

      <Link to={"/"} className="underline underline-offset-4 hover:opacity-80">
        <Text0>{t("Вернуться на главную")}</Text0>
      </Link>
    </div>
  )
}

export default PrivacyPolicy
