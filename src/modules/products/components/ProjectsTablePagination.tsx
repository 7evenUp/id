import { Table } from "@tanstack/react-table"
import { useTranslation } from "react-i18next"

import { ReactComponent as FastArrowLeft } from "@/assets/icons/fast-arrow-left.svg"
import { ReactComponent as FastArrowRight } from "@/assets/icons/fast-arrow-right.svg"
import { ReactComponent as NavArrowLeft } from "@/assets/icons/nav-arrow-left.svg"
import { ReactComponent as NavArrowRight } from "@/assets/icons/nav-arrow-right.svg"

import IconButton from "@/shared/ui/IconButton"

interface ProjectsTablePaginationProps<TData> {
  table: Table<TData>
}

function ProjectsTablePagination<TData>({
  table,
}: ProjectsTablePaginationProps<TData>) {
  const { t } = useTranslation("products")

  return (
    <div className="flex items-center justify-between px-2 3xl:px-[0.521vw]">
      <div className="flex items-center space-x-6 lg:space-x-8 3xl:space-x-[2.083vw]">
        <div className="flex items-center space-x-2 3xl:space-x-[0.521vw]">
          <IconButton
            className="bg-gray-3 hover:bg-gray-2 dark:bg-gray-4 dark:hover:bg-gray-5 active:bg-opacity-80 dark:active:bg-opacity-80 disabled:bg-gray-4 dark:disabled:bg-gray-2 rounded-full"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <FastArrowLeft className="h-4 w-4 3xl:h-[1.042vw] 3xl:w-[1.042vw] text-white dark:text-gray-1" />
          </IconButton>
          <IconButton
            className="bg-gray-3 hover:bg-gray-2 dark:bg-gray-4 dark:hover:bg-gray-5 active:bg-opacity-80 dark:active:bg-opacity-80 disabled:bg-gray-4 dark:disabled:bg-gray-2 rounded-full"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <NavArrowLeft className="h-4 w-4 3xl:h-[1.042vw] 3xl:w-[1.042vw] text-white dark:text-gray-1" />
          </IconButton>
          <div className="flex min-w-[100px] 3xl:min-w-[6.51vw] items-center justify-center text-sm 3xl:text-[0.911vw]/[1.302vw] font-medium">
            {t("res-bot.page-of", {
              current: table.getState().pagination.pageIndex + 1,
              total: table.getPageCount(),
            })}
          </div>

          <IconButton
            className="bg-gray-3 hover:bg-gray-2 dark:bg-gray-4 dark:hover:bg-gray-5 active:bg-opacity-80 dark:active:bg-opacity-80 disabled:bg-gray-4 dark:disabled:bg-gray-2 rounded-full"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <NavArrowRight className="h-4 w-4 3xl:h-[1.042vw] 3xl:w-[1.042vw] text-white dark:text-gray-1" />
          </IconButton>

          <IconButton
            className="bg-gray-3 hover:bg-gray-2 dark:bg-gray-4 dark:hover:bg-gray-5 active:bg-opacity-80 dark:active:bg-opacity-80 disabled:bg-gray-4 dark:disabled:bg-gray-2 rounded-full"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <FastArrowRight className="h-4 w-4 3xl:h-[1.042vw] 3xl:w-[1.042vw] text-white dark:text-gray-1" />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default ProjectsTablePagination
