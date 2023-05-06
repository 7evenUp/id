import { DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog"
import Button from "../ui/Button"

const TxHistoryModal = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>История транзакций</DialogTitle>
        <Button>выгрузить в pdf</Button>
      </DialogHeader>
      <table>
        <thead className="text-left text-gray-3">
          <tr>
            <th className="typography-tip pb-4">описание транзакции</th>
            <th className="typography-tip pb-4">дата</th>
            <th className="typography-tip pb-4">стоимость</th>
            <th className="typography-tip pb-4">статус</th>
            <th className="typography-tip pb-4">tx id</th>
          </tr>
        </thead>
        <tbody className="typography-text-1 divide-y divide-gray-4 dark:divide-gray-2">
          <tr>
            <td className="py-1">Покупка Calendar, 3 мес</td>
            <td className="py-1">Дек 01, 2022</td>
            <td className="py-1">$120</td>
            <td className="text-process typography-text-2 py-1">в процессе</td>
            <td className="py-1">внутренняя транзакция</td>
          </tr>
          <tr>
            <td className="py-1">Реф система {">"} Кошелёк</td>
            <td className="py-1">Июн 04, 2022</td>
            <td className="py-1">$120</td>
            <td className="text-success typography-text-2">успешно</td>
            <td className="py-1">n231nl123245o0</td>
          </tr>
          <tr>
            <td className="py-1">Реф система {">"} Мой баланс</td>
            <td className="py-1">Апр 10, 2022</td>
            <td className="py-1">$63</td>
            <td className="text-success typography-text-2">успешно</td>
            <td className="py-1">внутренняя транзакция</td>
          </tr>
          <tr>
            <td className="py-1">Покупка Calendar, 3 мес</td>
            <td className="py-1">Дек 01, 2022</td>
            <td className="py-1">$120</td>
            <td className="text-process typography-text-2">в процессе</td>
            <td className="py-1">внутренняя транзакция</td>
          </tr>
          <tr>
            <td className="py-1">Реф система {">"} Кошелёк</td>
            <td className="py-1">Июн 04, 2022</td>
            <td className="py-1">$120</td>
            <td className="text-success typography-text-2">успешно</td>
            <td className="py-1">n231nl123245o0</td>
          </tr>
          <tr>
            <td className="py-1">Реф система {">"} Мой баланс</td>
            <td className="py-1">Апр 10, 2022</td>
            <td className="py-1">$63</td>
            <td className="text-success typography-text-2">успешно</td>
            <td className="py-1">внутренняя транзакция</td>
          </tr>
          <tr>
            <td className="py-1">Покупка Research Bot, 1 мес</td>
            <td className="py-1">Сен 03, 2021</td>
            <td className="py-1">$12</td>
            <td className="text-error typography-text-2">отклонено</td>
            <td className="py-1">внутренняя транзакция</td>
          </tr>
          <tr>
            <td className="py-1">Пополнение баланса</td>
            <td className="py-1">Июн 02, 2021</td>
            <td className="py-1">$54</td>
            <td className="text-success typography-text-2">успешно</td>
            <td className="py-1">13r9mf20d</td>
          </tr>
        </tbody>
      </table>
    </DialogContent>
  )
}

export default TxHistoryModal
