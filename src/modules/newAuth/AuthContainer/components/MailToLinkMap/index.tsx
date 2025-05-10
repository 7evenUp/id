const MAIL_TO_LINK_MAP = {
  "yandex.ru": {
    name: "Yandex",
    link: "https://mail.yandex.ru/",
  },
  "ya.ru": {
    name: "Yandex",
    link: "https://mail.yandex.ru/",
  },
  "yandex.com": {
    name: "Yandex",
    link: "https://mail.yandex.ru/",
  },
  "yandex.by": {
    name: "Yandex",
    link: "https://mail.yandex.ru/",
  },
  "yandex.kz": {
    name: "Yandex",
    link: "https://mail.yandex.ru/",
  },
  "mail.ru": {
    name: "Mail",
    link: "https://e.mail.ru/",
  },
  "list.ru": {
    name: "Mail",
    link: "https://e.mail.ru/",
  },
  "bk.ru": {
    name: "Mail",
    link: "https://e.mail.ru/",
  },
  "inbox.ru": {
    name: "Mail",
    link: "https://e.mail.ru/",
  },
  "internet.ru": {
    name: "Mail",
    link: "https://e.mail.ru/",
  },
  "xmail.ru": {
    name: "Mail",
    link: "https://e.mail.ru/",
  },
  "gmail.com": {
    name: "Gmail",
    link: "https://mail.google.com/",
  },
}

const MailToLinkMap = ({ emailDomain }: { emailDomain: string }) => {
  if (emailDomain in MAIL_TO_LINK_MAP)
    return (
      <a
        href={
          MAIL_TO_LINK_MAP[emailDomain as keyof typeof MAIL_TO_LINK_MAP].link
        }
        target="_blank"
        style={{ textDecorationLine: "underline" }}
      >
        {MAIL_TO_LINK_MAP[emailDomain as keyof typeof MAIL_TO_LINK_MAP].name}
      </a>
    )
  return (
    <a
      href={`https://${emailDomain}`}
      target="_blank"
      style={{ textDecorationLine: "underline" }}
    >
      {emailDomain}
    </a>
  )
}

export default MailToLinkMap
