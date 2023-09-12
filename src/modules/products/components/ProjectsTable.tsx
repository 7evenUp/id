import { useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useTranslation } from "react-i18next"

import { ReactComponent as SortDown } from "@/assets/icons/sort-down.svg"
import { ReactComponent as SortUp } from "@/assets/icons/sort-up.svg"

import ProjectsTablePagination from "./ProjectsTablePagination"

import Switch from "@/shared/ui/Switch"
import SwitchWithText from "@/shared/ui/SwitchWithText"
import Button from "@/shared/ui/Button"
import Input from "@/shared/ui/Input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/shared/ui/Select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table"

import { Project } from "@/types/projects"

import { projects } from "@/utils/projects"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: ({ table }) => {
      // @ts-expect-error no-meta-types
      const { t } = table.options.meta

      return (
        <Input
          placeholder={t("res-bot.th-search")}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      )
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column, table }) => {
      // @ts-expect-error no-meta-types
      const { t } = table.options.meta
      return (
        <Button
          appearence={"text"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("res-bot.th-projects")}
          {column.getIsSorted() === "asc" ? (
            <SortDown className="w-4 h-4 3xl:w-[1.042vw] 3xl:h-[1.042vw]" />
          ) : (
            <SortUp className="w-4 h-4 3xl:w-[1.042vw] 3xl:h-[1.042vw]" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      return <Switch defaultChecked={row.getValue("isActive")} />
    },
  },
  {
    accessorKey: "options",
    header: ({ table }) => {
      // @ts-expect-error no-meta-types
      const { t } = table.options.meta
      return t("res-bot.th-subs")
    },
    cell: ({ row, table }) => {
      // @ts-expect-error no-meta-types
      const { t } = table.options.meta
      return (
        <Select defaultValue={row.getValue("options")}>
          <SelectTrigger className="w-[90px] 3xl:w-[5.859vw]" />
          <SelectContent className="w-[90px] 3xl:w-[5.859vw]">
            <SelectItem value="all">{t("res-bot.subs-options.all")}</SelectItem>
            <SelectItem value="main">
              {t("res-bot.subs-options.important")}
            </SelectItem>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: "socials",
    header: ({ table }) => {
      // @ts-expect-error no-meta-types
      const { t } = table.options.meta
      return t("res-bot.th-socials")
    },
    cell: ({ row }) => {
      const socials = row.getValue("socials") as {
        medium: boolean
        twitter: boolean
        discord: boolean
        telegram: boolean
      }

      return (
        <div className="flex gap-2 3xl:gap-[0.521vw] flex-wrap">
          <SwitchWithText defaultChecked={socials.medium}>
            medium
          </SwitchWithText>
          <SwitchWithText defaultChecked={socials.twitter}>
            twitter
          </SwitchWithText>
          <SwitchWithText defaultChecked={socials.discord}>
            discord
          </SwitchWithText>
          <SwitchWithText defaultChecked={socials.telegram}>
            telegram
          </SwitchWithText>
        </div>
      )
    },
  },
]

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { t } = useTranslation("products")

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    meta: { t },
  })

  return (
    <div className="rounded-xl 3xl:rounded-[0.781vw] bg-white dark:bg-gray-1">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="w-full flex justify-center py-3 3xl:py-[0.781vw]">
        <ProjectsTablePagination table={table} />
      </div>
    </div>
  )
}

const ProjectsTable = () => {
  return (
    <DataTable
      columns={columns}
      data={projects.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })}
    />
  )
}

export default ProjectsTable
