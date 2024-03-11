import { useTranslation } from "react-i18next"

import TabHeader from "../components/TabHeader"
import TabTitle from "../components/TabTitle"

import ExternalLink from "@/shared/ui/ExternalLink"
import { Skeleton } from "@/shared/ui/Skeleton"

import RowItem from "@/shared/components/RowItem"

import Text1 from "@/shared/typography/Text1"

import { useAppSelector } from "@/redux/hooks"
import { useNutcrackersQuery } from "@/redux/api/profile"

import { cn } from "@/lib/classNames"

// import { Nutcrackers } from "@/types/nutcrackers"
// const mockNutcrackersData: Nutcrackers | undefined = {
//   maxRarity: "mythical",
//   pointsCacheBack: 10,
//   nutcrackers: [
//     {
//       name: "Nutcracker",
//       imageLink:
//         "https://i.getgems.io/mUaYZ7YYfqjAVRhc89xex0M92kmjdoinPzmKKaEEHM8/rs:fill:1000:0:1/g:ce/czM6Ly9nZXRnZW1zLW5mdC9uZnQvYi9jLzY1ODAxNmFiYzYxNjMzOGVjN2VlYzFlNC9pbWcvbnV0cy9hOTYxMThiOGVjLnBuZw",
//       attributes: {
//         Rarity: "common",
//         Background: "Emerald",
//         Body: "Gentleman",
//         Eyes: "Wicked",
//         Hat: "Cylinder",
//         Mouth: "Dali",
//       },
//       index: 85928859119616,
//       contract:
//         "0:b3fa0903d9712318efceef7e86da2919bd747bdfed9866692c96762eed039360",
//       owner:
//         "0:9cb89e8dc3ed56cc307219f31ae26f4c8bfa20e7e19f78d23fcc408e5d41a3d6",
//       rarity: "common",
//       getGemsLink:
//         "https://getgems.io/collection/EQB3Pd1e7fs89vw6wwlDzS-CrdvDY8phfdn7yKgvL6UQn6ij/EQCXr_mewkYjroCwSe_N7s0c7_Hq72pjSiLAqAcdnn_nQO9V",
//     },
//     {
//       name: "Nutcracker",
//       imageLink:
//         "https://i.getgems.io/opLI8TLwVvySAvxpgCTYciApL9RR3_YkSSdSb6rU6JY/rs:fill:1000:0:1/g:ce/czM6Ly9nZXRnZW1zLW5mdC9uZnQvYi9jLzY1ODAxNmFiYzYxNjMzOGVjN2VlYzFlNC9pbWcvbnV0cy9kYzBlMDc5YzkyLnBuZw",
//       attributes: {
//         Rarity: "uncommon",
//         Background: "Emerald",
//         Body: "Gentleman",
//         Eyes: "Wicked",
//         Hat: "Cylinder",
//         Mouth: "Dali",
//       },
//       index: 85928859119616,
//       contract:
//         "0:b3fa0903d9712318efceef7e86da2919bd747bdfed9866692c96762eed039360",
//       owner:
//         "0:9cb89e8dc3ed56cc307219f31ae26f4c8bfa20e7e19f78d23fcc408e5d41a3d6",
//       rarity: "uncommon",
//       getGemsLink:
//         "https://getgems.io/collection/EQB3Pd1e7fs89vw6wwlDzS-CrdvDY8phfdn7yKgvL6UQn6ij/EQBKa61nCkitVcOraARDjTqYpxbz1hJyFBpK1yTpNAXxjblS",
//     },
//     {
//       name: "Nutcracker",
//       imageLink:
//         "https://i.getgems.io/9PJQYBRINwNmaPJToLGzI3dpqPalXRKtq8Uwk_BpVrs/rs:fill:1000:0:1/g:ce/czM6Ly9nZXRnZW1zLW5mdC9uZnQvYi9jLzY1ODAxNmFiYzYxNjMzOGVjN2VlYzFlNC9pbWcvbnV0cy80OTZlODU1ZTIyLnBuZw",
//       attributes: {
//         Rarity: "rare",
//         Background: "Emerald",
//         Body: "Gentleman",
//         Eyes: "Wicked",
//         Hat: "Cylinder",
//         Mouth: "Dali",
//       },
//       index: 85928859119616,
//       contract:
//         "0:b3fa0903d9712318efceef7e86da2919bd747bdfed9866692c96762eed039360",
//       owner:
//         "0:9cb89e8dc3ed56cc307219f31ae26f4c8bfa20e7e19f78d23fcc408e5d41a3d6",
//       rarity: "rare",
//       getGemsLink:
//         "https://getgems.io/collection/EQB3Pd1e7fs89vw6wwlDzS-CrdvDY8phfdn7yKgvL6UQn6ij/EQADGIIy_DJBnXOryqP5HOPvRtAytLoyg9LCK7VguEwzJOPU",
//     },
//     {
//       name: "Nutcracker Vintage Gentlemen 12",
//       imageLink:
//         "https://s.getgems.io/nft/b/c/658016abc616338ec7eec1e4/img/nuts/gentleman_12.png",
//       attributes: {
//         Rarity: "epic",
//         Background: "Emerald",
//         Body: "Gentleman",
//         Eyes: "Wicked",
//         Hat: "Cylinder",
//         Mouth: "Dali",
//       },
//       index: 85928859119616,
//       contract:
//         "0:b3fa0903d9712318efceef7e86da2919bd747bdfed9866692c96762eed039360",
//       owner:
//         "0:9cb89e8dc3ed56cc307219f31ae26f4c8bfa20e7e19f78d23fcc408e5d41a3d6",
//       rarity: "epic",
//       getGemsLink:
//         "https://getgems.io/collection/EQB3Pd1e7fs89vw6wwlDzS-CrdvDY8phfdn7yKgvL6UQn6ij/EQCz-gkD2XEjGO_O736G2ikZvXR73-2YZmkslnYu7QOTYFBL",
//     },
//     {
//       name: "Nutcracker Vintage Gentlemen 12",
//       imageLink:
//         "https://i.getgems.io/l0vch1_7F4IiA69tmy9tCxTqxdBIKIwJSLAc15E0Af0/rs:fill:1000:0:1/g:ce/czM6Ly9nZXRnZW1zLW5mdC9uZnQvYi9jLzY1ODAxNmFiYzYxNjMzOGVjN2VlYzFlNC9pbWcvbnV0cy81ODQwNjdjMjljLnBuZw",
//       attributes: {
//         Rarity: "mythical",
//         Background: "Emerald",
//         Body: "Gentleman",
//         Eyes: "Wicked",
//         Hat: "Cylinder",
//         Mouth: "Dali",
//       },
//       index: 85928859119616,
//       contract:
//         "0:b3fa0903d9712318efceef7e86da2919bd747bdfed9866692c96762eed039360",
//       owner:
//         "0:9cb89e8dc3ed56cc307219f31ae26f4c8bfa20e7e19f78d23fcc408e5d41a3d6",
//       rarity: "mythical",
//       getGemsLink:
//         "https://getgems.io/collection/EQB3Pd1e7fs89vw6wwlDzS-CrdvDY8phfdn7yKgvL6UQn6ij/EQDdWcGyMxPZHgwJ9V33NZAuNC84p07ZKxqF1P071m2Y9ODW",
//     },
//     {
//       name: "Nutcracker Vintage Gentlemen 12",
//       imageLink:
//         "https://i.getgems.io/UsjIBqE0pZ9fBRMhmWpN5DeUDOuJieyYaz6wVQJDXT4/rs:fill:1000:0:1/g:ce/czM6Ly9nZXRnZW1zLW5mdC9uZnQvYi9jLzY1ODAxNmFiYzYxNjMzOGVjN2VlYzFlNC9pbWcvbnV0cy9oZXNveWFtLnBuZw",
//       attributes: {
//         Rarity: "legendary",
//         Background: "Emerald",
//         Body: "Gentleman",
//         Eyes: "Wicked",
//         Hat: "Cylinder",
//         Mouth: "Dali",
//       },
//       index: 85928859119616,
//       contract:
//         "0:b3fa0903d9712318efceef7e86da2919bd747bdfed9866692c96762eed039360",
//       owner:
//         "0:9cb89e8dc3ed56cc307219f31ae26f4c8bfa20e7e19f78d23fcc408e5d41a3d6",
//       rarity: "legendary",
//       getGemsLink:
//         "https://getgems.io/collection/EQB3Pd1e7fs89vw6wwlDzS-CrdvDY8phfdn7yKgvL6UQn6ij/EQDkyEQJ7KKLcc_yP_yKtQiI3u0ESAlFruR9YGgq8MBzIhhh",
//     },
//   ],
// }

const NutcrackerTab = () => {
  const { t } = useTranslation("products")

  const scale = useAppSelector((state) => state.scale.value)

  const { data, isLoading } = useNutcrackersQuery()

  return (
    <>
      <TabHeader>
        <TabTitle
          title={t("nutcracker.title")}
          link="https://getgems.io/nutcrackers"
        />
      </TabHeader>

      <RowItem
        className={cn(
          "flex flex-col items-start gap-2",
          scale && "3xl:gap-[0.52vw]"
        )}
      >
        <ExternalLink
          href="https://nutcrackers-mint.crypton.xyz/"
          className="w-fit"
        >
          {t("nutcracker.mint-website")}
        </ExternalLink>
        <ExternalLink href="https://getgems.io/nutcrackers" className="w-fit">
          {t("nutcracker.buy-on-getgems")}
        </ExternalLink>
      </RowItem>

      <RowItem
        className={cn(
          "flex-col items-stretch gap-3",
          scale && "3xl:gap-[0.781vw]"
        )}
      >
        {t("nutcracker.your-nutcrackers")}
        {isLoading ? (
          <div
            className={cn("flex gap-4 flex-wrap", scale && "3xl:gap-[1.041vw]")}
          >
            <Skeleton
              className={cn(
                "w-[160px] aspect-square rounded-xl",
                scale && "3xl:w-[10.416vw]"
              )}
            />
            <Skeleton
              className={cn(
                "w-[160px] aspect-square rounded-xl",
                scale && "3xl:w-[10.416vw]"
              )}
            />
            <Skeleton
              className={cn(
                "w-[160px] aspect-square rounded-xl",
                scale && "3xl:w-[10.416vw]"
              )}
            />
            <Skeleton
              className={cn(
                "w-[160px] aspect-square rounded-xl",
                scale && "3xl:w-[10.416vw]"
              )}
            />
          </div>
        ) : data ? (
          data.nutcrackers.length === 0 ? (
            <Text1>{t("nutcracker.you-have-not-nutcrackers")}</Text1>
          ) : (
            <div
              className={cn(
                "flex gap-4 flex-wrap",
                scale && "3xl:gap-[1.041vw]"
              )}
            >
              {data.nutcrackers.map(({ imageLink, name, getGemsLink }, i) => (
                <a
                  key={i}
                  href={getGemsLink}
                  target="_blank"
                  className={cn(
                    "max-w-[160px] rounded-xl",
                    scale && "3xl:max-w-[10.416vw] 3xl:rounded-[0.78125vw]"
                  )}
                >
                  <img
                    src={imageLink}
                    alt={name}
                    className={cn(
                      "rounded-xl",
                      scale && "3xl:rounded-[0.78125vw]"
                    )}
                  />
                </a>
              ))}
            </div>
          )
        ) : (
          <Text1>{t("nutcracker.load-error")}</Text1>
        )}
      </RowItem>
    </>
  )
}

export default NutcrackerTab
