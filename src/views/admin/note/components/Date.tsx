import Card from 'components/card'
import React from 'react'

export default function Date() {
  return (
    <Card extra={"w-full h-full sm:overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Date Card Test
        </div>
      </header>
    </Card>
  )
}
