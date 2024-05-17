import TextAccent from "@/shared/typography/TextAccent"

const RarityToDiscountTable = () => {
  return (
    <>
      <a
        href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Common%22%5D%7D%7D"
        target="_blank"
        className="flex items-center justify-between hover:underline"
      >
        <span>common</span>
        <TextAccent className="tabular-nums">10%</TextAccent>
      </a>
      <a
        href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Uncommon%22%5D%7D%7D"
        target="_blank"
        className="flex items-center justify-between text-tools-green hover:underline"
      >
        <span>uncommon</span>
        <TextAccent className="tabular-nums">12%</TextAccent>
      </a>
      <a
        href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Rare%22%5D%7D%7D"
        target="_blank"
        className="flex items-center justify-between text-res-bot-blue hover:underline"
      >
        <span>rare</span>
        <TextAccent className="tabular-nums">14%</TextAccent>
      </a>
      <a
        href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Mythical%22%5D%7D%7D"
        target="_blank"
        className="flex items-center justify-between text-prime-pink hover:underline"
      >
        <span>mythical</span>
        <TextAccent className="tabular-nums">16%</TextAccent>
      </a>
      <a
        href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Epic%22%5D%7D%7D"
        target="_blank"
        className="flex items-center justify-between text-university-velvet hover:underline"
      >
        <span>epic</span>
        <TextAccent className="tabular-nums">18%</TextAccent>
      </a>
      <a
        href="https://getgems.io/nutcrackers?filter=%7B%22attributes%22%3A%7B%22Rarity%22%3A%5B%22Legendary%22%5D%7D%7D"
        target="_blank"
        className="flex items-center justify-between text-academy-gold hover:underline"
      >
        <span>legendary</span>
        <TextAccent className="tabular-nums">20%</TextAccent>
      </a>
    </>
  )
}

export default RarityToDiscountTable
