import Card from 'components/card'
import React from 'react'
import MiniCalendar from 'components/calendar/MiniCalendar'

export default function Date() {
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className=' flex flex-col items-center'>
        <header className="relative flex items-center justify-between pt-4">
          <div className="text-2xl font-bold text-navy-700 dark:text-white">
            Date Card Test
          </div>
        </header>
        <hr className=' mt-3 flex w-full mb-5 dark:text-gray-800' />
        {/* 선택지 부분 */}
        {/* TODO: Element로 만들어서 map으로 코드 단순화하기 */}
        <MiniCalendar />
      </div>
    </Card>
  )
}
